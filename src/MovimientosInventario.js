import React, { useState } from 'react';

// Datos iniciales de prueba (se reemplazan dinámicamente cuando Persona 2 defina la lista global)
const PRODUCTOS_INICIALES = [
  { id: 1, nombre: 'Teclado Mecánico', stock: 15 },
  { id: 2, nombre: 'Mouse Inalámbrico', stock: 30 },
  { id: 3, nombre: 'Monitor 24"', stock: 8 },
];

export default function MovimientosInventario({ productos = PRODUCTOS_INICIALES, onActualizarStock }) {
  const [listaProductos, setListaProductos] = useState(productos);
  const [movimientos, setMovimientos] = useState([
    {
      id: 1,
      productoNombre: 'Teclado Mecánico',
      tipo: 'Entrada',
      cantidad: 5,
      fecha: new Date().toLocaleString(),
      motivo: 'Compra a proveedor',
    },
  ]);

  const [productoId, setProductoId] = useState('');
  const [tipoMovimiento, setTipoMovimiento] = useState('Entrada');
  const [cantidad, setCantidad] = useState('');
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');