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
        // Registrar el movimiento en el historial
        const nuevoMovimiento = {
            id: Date.now(),
            productoNombre: prodSeleccionado.nombre,
            tipo: tipoMovimiento,
            cantidad: cantidadNum,
            fecha: new Date().toLocaleString(),
            motivo: motivo || 'Sin motivo especificado',
        };

        setMovimientos([nuevoMovimiento, ...movimientos]);

        // Limpiar formulario
        setCantidad('');
        setMotivo('');
        setProductoId('');
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', color: '#fff' }}>
            <h2> Gestión de Movimientos de Inventario</h2>

            {/* Formulario de registro de movimiento */}
            <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
                <h3>Registrar Movimiento</h3>

                {error && <p style={{ color: '#ff6b6b', fontWeight: 'bold' }}>⚠️ {error}</p>}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', maxWidth: '500px' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Producto:</label>
                        <select
                            value={productoId}
                            onChange={(e) => setProductoId(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                        >
                            <option value="">-- Seleccionar producto --</option>
                            {listaProductos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.nombre} (Stock actual: {p.stock})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Tipo de Movimiento:</label>
                        <select
                            value={tipoMovimiento}
                            onChange={(e) => setTipoMovimiento(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                        >
                            <option value="Entrada"> Entrada (Aumenta stock)</option>
                            <option value="Salida"> Salida (Reduce stock)</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Cantidad:</label>
                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(e.target.value)}
                            placeholder="Ej: 10"
                            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '5px' }}>Motivo / Observación:</label>
                        <input
                            type="text"
                            value={motivo}
                            onChange={(e) => setMotivo(e.target.value)}
                            placeholder="Ej: Venta #1042 o Reposición de stock"
                            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '10px 15px',
                            backgroundColor: tipoMovimiento === 'Entrada' ? '#2e7d32' : '#c62828',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Registrar {tipoMovimiento}
                    </button>
                </form>
            </div>