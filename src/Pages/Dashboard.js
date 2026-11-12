import { useMemo, useState } from "react";
import {
  LOW_STOCK_THRESHOLD,
  esEntrada,
  estadoProducto,
  calcularResumen,
  productosEnAlerta,
  masVendidos,
  resumenMovimientos,
} from "../Utils/inventario";
import "../Styles/Dashboard.css";

const numero = new Intl.NumberFormat("es-CO");

const ETIQUETA_ESTADO = { agotado: "Agotado", bajo: "Stock bajo" };

/** Barra de nivel: la marca vertical del centro indica el umbral de stock bajo. */
function Nivel({ cantidad, estado }) {
  const tope = Math.max(LOW_STOCK_THRESHOLD * 2, 1);
  const porcentaje = Math.min(Math.max(cantidad, 0) / tope, 1) * 100;
  return (
    <div
      className="sw-nivel"
      role="img"
      aria-label={`${cantidad} unidades en existencia, mínimo ${LOW_STOCK_THRESHOLD}`}
    >
      <div
        className={`sw-nivel__lleno sw-nivel__lleno--${estado}`}
        style={{ width: `${porcentaje}%` }}
      />
    </div>
  );
}

function Resumen({ resumen }) {
  const datos = [
    { etiqueta: "Productos registrados", valor: resumen.totalProductos },
    { etiqueta: "Unidades en existencia", valor: resumen.totalUnidades },
    { etiqueta: "Agotados", valor: resumen.agotados, tono: "agotado" },
    { etiqueta: "Con stock bajo", valor: resumen.bajos, tono: "bajo" },
  ];
  return (
    <dl className="sw-resumen">
      {datos.map((d) => (
        <div key={d.etiqueta} className={`sw-resumen__dato ${d.tono ? `sw-resumen__dato--${d.tono}` : ""}`}>
          <dt>{d.etiqueta}</dt>
          <dd>{numero.format(d.valor)}</dd>
        </div>
      ))}
    </dl>
  );
}

function Alertas({ productos }) {
  const [filtro, setFiltro] = useState("todos");
  const enAlerta = useMemo(() => productosEnAlerta(productos), [productos]);

  const cuenta = {
    todos: enAlerta.length,
    agotado: enAlerta.filter((p) => estadoProducto(p) === "agotado").length,
    bajo: enAlerta.filter((p) => estadoProducto(p) === "bajo").length,
  };
  const visibles = filtro === "todos" ? enAlerta : enAlerta.filter((p) => estadoProducto(p) === filtro);

  const filtros = [
    { id: "todos", texto: "Todos" },
    { id: "agotado", texto: "Agotados" },
    { id: "bajo", texto: "Stock bajo" },
  ];

  return (
    <section className="sw-panel" aria-labelledby="titulo-alertas">
      <div className="sw-panel__cabecera">
        <h2 id="titulo-alertas">Productos por reponer</h2>
        <div className="sw-filtros" role="group" aria-label="Filtrar alertas">
          {filtros.map((f) => (
            <button
              key={f.id}
              type="button"
              className="sw-filtro"
              aria-pressed={filtro === f.id}
              onClick={() => setFiltro(f.id)}
            >
              {f.texto} ({cuenta[f.id]})
            </button>
          ))}
        </div>
      </div>

      {productos.length === 0 ? (
        <p className="sw-vacio">Aún no hay productos. Agrégalos en la sección Productos.</p>
      ) : visibles.length === 0 ? (
        <p className="sw-vacio">
          {enAlerta.length === 0
            ? "Todo en orden: ningún producto tiene stock bajo."
            : "No hay productos en esta categoría."}
        </p>
      ) : (
        <ul className="sw-lista">
          {visibles.map((p) => {
            const estado = estadoProducto(p);
            const cantidad = Number(p.quantity) || 0;
            const faltan = Math.max(LOW_STOCK_THRESHOLD - cantidad, 0);
            return (
              <li key={p.id} className="sw-alerta">
                <div className="sw-alerta__texto">
                  <p className="sw-alerta__nombre">{p.name}</p>
                  <p className="sw-alerta__detalle">{p.category}</p>
                </div>
                <span className={`sw-insignia sw-insignia--${estado}`}>{ETIQUETA_ESTADO[estado]}</span>
                <Nivel cantidad={cantidad} estado={estado} />
                <p className="sw-alerta__cifras">
                  {cantidad === 0 ? "Sin unidades" : `${numero.format(cantidad)} en existencia`}
                  {" · "}stock bajo desde {LOW_STOCK_THRESHOLD}
                  {faltan > 0 && ` · faltan ${numero.format(faltan)}`}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function Actividad({ movimientos }) {
  const totales = useMemo(() => resumenMovimientos(movimientos), [movimientos]);
  // App.js guarda los movimientos con el más reciente primero.
  const recientes = movimientos.slice(0, 6);

  return (
    <section className="sw-panel" aria-labelledby="titulo-actividad">
      <div className="sw-panel__cabecera">
        <h2 id="titulo-actividad">Actividad reciente</h2>
      </div>
      {recientes.length === 0 ? (
        <p className="sw-vacio">Aún no hay movimientos. Registra una entrada o salida en Movimientos para verla aquí.</p>
      ) : (
        <>
          <p className="sw-panel__nota">
            {totales.entradas} entradas (+{numero.format(totales.unidadesEntrada)} unidades) y{" "}
            {totales.salidas} salidas (−{numero.format(totales.unidadesSalida)} unidades) en los movimientos registrados.
          </p>
          <ul className="sw-lista">
            {recientes.map((m) => (
              <li key={m.id} className="sw-movimiento">
                <div>
                  <p className="sw-alerta__nombre">{m.productoNombre || "Producto sin nombre"}</p>
                  <p className="sw-alerta__detalle">{m.fecha}</p>
                </div>
                <p className={`sw-movimiento__cantidad sw-movimiento__cantidad--${esEntrada(m) ? "entrada" : "salida"}`}>
                  {esEntrada(m) ? "Entrada +" : "Salida −"}
                  {numero.format(Number(m.cantidad) || 0)}
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

function MasVendidos({ movimientos }) {
  const ranking = useMemo(() => masVendidos(movimientos, 5), [movimientos]);
  const maximo = ranking[0]?.unidades ?? 1;

  return (
    <section className="sw-panel" aria-labelledby="titulo-vendidos">
      <div className="sw-panel__cabecera">
        <h2 id="titulo-vendidos">Más vendidos</h2>
      </div>
      {ranking.length === 0 ? (
        <p className="sw-vacio">Aún no hay salidas registradas.</p>
      ) : (
        <ol className="sw-lista sw-ranking">
          {ranking.map((r) => (
            <li key={r.nombre} className="sw-ranking__item">
              <div className="sw-ranking__linea">
                <span>{r.nombre}</span>
                <span className="sw-ranking__valor">{numero.format(r.unidades)} unidades</span>
              </div>
              <div className="sw-ranking__barra" aria-hidden="true">
                <div style={{ width: `${(r.unidades / maximo) * 100}%` }} />
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

/**
 * Dashboard de StockWise. Recibe el estado compartido de App.js:
 *   <Dashboard products={products} movimientos={movimientos} />
 */
function Dashboard({ products = [], movimientos = [] }) {
  const resumen = useMemo(() => calcularResumen(products), [products]);

  return (
    <main className="sw-dashboard">
      <header className="sw-cabecera">
        <div>
          <h1>Resumen del inventario</h1>
          <p>Tu inventario. Bajo control.</p>
        </div>
      </header>

      <Resumen resumen={resumen} />

      <div className="sw-rejilla">
        <Alertas productos={products} />
        <div className="sw-columna">
          <Actividad movimientos={movimientos} />
          <MasVendidos movimientos={movimientos} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
