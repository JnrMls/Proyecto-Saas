import { test } from "node:test";
import assert from "node:assert/strict";
import {
  estadoProducto,
  calcularResumen,
  productosEnAlerta,
  masVendidos,
  resumenMovimientos,
} from "./inventario.js";
import { productosDemo, movimientosDemo } from "../data/datosPrueba.js";

test("estadoProducto: agotado, bajo y ok", () => {
  assert.equal(estadoProducto({ cantidad: 0, stock_minimo: 5 }), "agotado");
  assert.equal(estadoProducto({ cantidad: 3, stock_minimo: 5 }), "bajo");
  assert.equal(estadoProducto({ cantidad: 6, stock_minimo: 5 }), "ok");
});

test("estadoProducto: en el mínimo exacto cuenta como bajo", () => {
  assert.equal(estadoProducto({ cantidad: 5, stock_minimo: 5 }), "bajo");
});

test("estadoProducto: cantidad negativa se trata como agotado", () => {
  assert.equal(estadoProducto({ cantidad: -2, stock_minimo: 5 }), "agotado");
});

test("calcularResumen con datos de prueba", () => {
  const r = calcularResumen(productosDemo);
  assert.equal(r.totalProductos, 10);
  assert.equal(r.totalUnidades, 178);
  assert.equal(r.agotados, 2);
  assert.equal(r.bajos, 3);
});

test("calcularResumen con lista vacía", () => {
  assert.deepEqual(calcularResumen([]), {
    totalProductos: 0,
    totalUnidades: 0,
    agotados: 0,
    bajos: 0,
  });
});

test("productosEnAlerta: solo alertas, agotados primero", () => {
  const alertas = productosEnAlerta(productosDemo);
  assert.equal(alertas.length, 5);
  assert.ok(alertas.every((p) => estadoProducto(p) !== "ok"));
  assert.deepEqual(
    alertas.slice(0, 2).map((p) => p.cantidad),
    [0, 0]
  );
});

test("productosEnAlerta: stock_minimo 0 no produce NaN", () => {
  const lista = [{ id: 1, cantidad: 0, stock_minimo: 0 }];
  assert.equal(productosEnAlerta(lista).length, 1);
});

test("masVendidos: suma salidas, ignora entradas y ordena", () => {
  const ranking = masVendidos(movimientosDemo, productosDemo, 3);
  assert.equal(ranking.length, 3);
  assert.equal(ranking[0].nombre, "Cuaderno argollado 100 hojas");
  assert.equal(ranking[0].unidades, 14);
  assert.ok(ranking[0].unidades >= ranking[1].unidades);
});

test("masVendidos: producto eliminado conserva el movimiento", () => {
  const movs = [{ id: 1, producto_id: 99, tipo: "salida", cantidad: 4, fecha: "2026-11-01" }];
  const ranking = masVendidos(movs, productosDemo);
  assert.equal(ranking[0].nombre, "Producto eliminado");
});

test("resumenMovimientos cuenta entradas y salidas", () => {
  const r = resumenMovimientos(movimientosDemo);
  assert.equal(r.entradas, 3);
  assert.equal(r.salidas, 9);
  assert.equal(r.unidadesEntrada, 95);
  assert.equal(r.unidadesSalida, 66);
});
