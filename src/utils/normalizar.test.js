import { test } from "node:test";
import assert from "node:assert/strict";
import { normalizarProductos, normalizarMovimientos } from "./normalizar.js";

test("normalizarProductos convierte textos a número", () => {
  const [p] = normalizarProductos([
    { id: 1, nombre: "A", categoria: "X", cantidad: "42", stock_minimo: "10", precio: "3500.50" },
  ]);
  assert.equal(p.cantidad, 42);
  assert.equal(p.stock_minimo, 10);
  assert.equal(p.precio, 3500.5);
});

test("normalizarProductos rellena nulos y valores inválidos", () => {
  const [p] = normalizarProductos([{ id: 2, nombre: null, categoria: null, cantidad: null, stock_minimo: "abc" }]);
  assert.equal(p.nombre, "Sin nombre");
  assert.equal(p.categoria, "Sin categoría");
  assert.equal(p.cantidad, 0);
  assert.equal(p.stock_minimo, 0);
});

test("normalizarProductos: si no llega una lista devuelve []", () => {
  assert.deepEqual(normalizarProductos(null), []);
  assert.deepEqual(normalizarProductos({ error: "x" }), []);
});

test("normalizarMovimientos acepta ENTRADA en mayúsculas", () => {
  const [m] = normalizarMovimientos([{ id: 1, producto_id: 1, tipo: "ENTRADA", cantidad: "5" }]);
  assert.equal(m.tipo, "entrada");
  assert.equal(m.cantidad, 5);
});
