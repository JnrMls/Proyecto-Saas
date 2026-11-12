// Lógica del dashboard. Usa los mismos campos que el estado compartido de App.js:
//   producto:   { id, name, category, quantity, price }
//   movimiento: { id, productoNombre, tipo: "Entrada" | "Salida", cantidad, fecha }

// Un producto con esta cantidad o menos se considera "stock bajo".
export const LOW_STOCK_THRESHOLD = 5;

export const esEntrada = (movimiento) =>
  String(movimiento.tipo).toLowerCase() === "entrada";

/** "agotado" (0 unidades), "bajo" (en o por debajo del umbral) u "ok". */
export function estadoProducto(producto, umbral = LOW_STOCK_THRESHOLD) {
  const cantidad = Number(producto.quantity) || 0;
  if (cantidad <= 0) return "agotado";
  if (cantidad <= umbral) return "bajo";
  return "ok";
}

export function calcularResumen(productos, umbral = LOW_STOCK_THRESHOLD) {
  return productos.reduce(
    (acc, p) => {
      const estado = estadoProducto(p, umbral);
      acc.totalProductos += 1;
      acc.totalUnidades += Number(p.quantity) || 0;
      if (estado === "agotado") acc.agotados += 1;
      if (estado === "bajo") acc.bajos += 1;
      return acc;
    },
    { totalProductos: 0, totalUnidades: 0, agotados: 0, bajos: 0 }
  );
}

/** Productos agotados o con poco stock; primero los de menor cantidad. */
export function productosEnAlerta(productos, umbral = LOW_STOCK_THRESHOLD) {
  return productos
    .filter((p) => estadoProducto(p, umbral) !== "ok")
    .sort((a, b) => (Number(a.quantity) || 0) - (Number(b.quantity) || 0));
}

/** Suma las salidas por producto y devuelve los n con más unidades. */
export function masVendidos(movimientos, n = 5) {
  const totales = new Map();
  for (const m of movimientos) {
    if (esEntrada(m)) continue;
    const nombre = m.productoNombre || "Producto sin nombre";
    totales.set(nombre, (totales.get(nombre) ?? 0) + (Number(m.cantidad) || 0));
  }
  return [...totales.entries()]
    .map(([nombre, unidades]) => ({ nombre, unidades }))
    .sort((a, b) => b.unidades - a.unidades)
    .slice(0, n);
}

export function resumenMovimientos(movimientos) {
  const base = { entradas: 0, salidas: 0, unidadesEntrada: 0, unidadesSalida: 0 };
  return movimientos.reduce((acc, m) => {
    const cantidad = Number(m.cantidad) || 0;
    if (esEntrada(m)) {
      acc.entradas += 1;
      acc.unidadesEntrada += cantidad;
    } else {
      acc.salidas += 1;
      acc.unidadesSalida += cantidad;
    }
    return acc;
  }, base);
}
