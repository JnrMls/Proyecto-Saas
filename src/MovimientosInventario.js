import React, { useState } from 'react';

// Datos iniciales de prueba
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

    if (!productoId || !cantidad || Number(cantidad) <= 0) {
            setError('Por favor selecciona un producto y una cantidad válida.');
            return;
        }

        const prodSeleccionado = listaProductos.find((p) => p.id === Number(productoId));
        if (!prodSeleccionado) {
            setError('Producto no encontrado.');
            return;
        }

        const cantidadNum = Number(cantidad);

        // Validar existencias en caso de salida
        if (tipoMovimiento === 'Salida' && prodSeleccionado.stock < cantidadNum) {
            setError(`Stock insuficiente. Disponible actual: ${prodSeleccionado.stock}`);
            return;
        }

    // Actualizar el stock del producto
        const nuevoStock =
            tipoMovimiento === 'Entrada'
                ? prodSeleccionado.stock + cantidadNum
                : prodSeleccionado.stock - cantidadNum;

        const productosActualizados = listaProductos.map((prod) =>
        prod.id === Number(productoId) ? { ...prod, stock: nuevoStock } : prod
        );

        setListaProductos(productosActualizados);

        if (onActualizarStock) {
        onActualizarStock(productosActualizados);
        }