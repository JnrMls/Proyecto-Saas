import {
  LOW_STOCK_THRESHOLD,
  estadoProducto,
  calcularResumen,
  productosEnAlerta,
  masVendidos,
  resumenMovimientos,
} from "./inventario";

const productos = [
  { id: 1, name: "Arroz", category: "Alimentos", quantity: 25, price: 4000 },
  { id: 2, name: "Teclado", category: "Tecnología", quantity: 15, price: 120000 },
  { id: 3, name: "Mouse", category: "Tecnología", quantity: 4, price: 55000 },
  { id: 4, name: "Gorra", category: "Accesorios", quantity: 0, price: 28000 },
];

const movimientos = [
  { id: 1, productoNombre: "Arroz", tipo: "Salida", cantidad: 5, fecha: "x" },
  { id: 2, productoNombre: "Mouse", tipo: "Entrada", cantidad: 10, fecha: "x" },
  { id: 3, productoNombre: "Arroz", tipo: "Salida", cantidad: 3, fecha: "x" },
  { id: 4, productoNombre: "Teclado", tipo: "Salida", cantidad: 2, fecha: "x" },
];

test("estadoProducto: agotado, bajo y ok", () => {
  expect(estadoProducto({ quantity: 0 })).toBe("agotado");
  expect(estadoProducto({ quantity: 3 })).toBe("bajo");
  expect(estadoProducto({ quantity: LOW_STOCK_THRESHOLD })).toBe("bajo");
  expect(estadoProducto({ quantity: LOW_STOCK_THRESHOLD + 1 })).toBe("ok");
});

test("estadoProducto: cantidad negativa o inválida cuenta como agotado", () => {
  expect(estadoProducto({ quantity: -2 })).toBe("agotado");
  expect(estadoProducto({ quantity: "abc" })).toBe("agotado");
});

test("calcularResumen cuenta productos, unidades, agotados y bajos", () => {
  expect(calcularResumen(productos)).toEqual({
    totalProductos: 4,
    totalUnidades: 44,
    agotados: 1,
    bajos: 1,
  });
});

test("calcularResumen con lista vacía devuelve ceros", () => {
  expect(calcularResumen([])).toEqual({
    totalProductos: 0,
    totalUnidades: 0,
    agotados: 0,
    bajos: 0,
  });
});

test("productosEnAlerta devuelve solo agotados y bajos, el más crítico primero", () => {
  const alertas = productosEnAlerta(productos);
  expect(alertas.map((p) => p.name)).toEqual(["Gorra", "Mouse"]);
});

test("masVendidos suma solo las salidas y ordena de mayor a menor", () => {
  expect(masVendidos(movimientos)).toEqual([
    { nombre: "Arroz", unidades: 8 },
    { nombre: "Teclado", unidades: 2 },
  ]);
});

test("resumenMovimientos separa entradas y salidas", () => {
  expect(resumenMovimientos(movimientos)).toEqual({
    entradas: 1,
    salidas: 3,
    unidadesEntrada: 10,
    unidadesSalida: 10,
  });
});
