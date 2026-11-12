import React, { useState } from 'react';

export default function MovimientosInventario({
    productos = [],
    onActualizarStock,
    movimientos = [],
    setMovimientos,
}) {

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

        const prodSeleccionado = productos.find((p) => String(p.id) === String(productoId));
        if (!prodSeleccionado) {
            setError('Producto no encontrado.');
            return;
        }

        const cantidadNum = Number(cantidad);

        // Validar existencias en caso de salida
        if (tipoMovimiento === 'Salida' && Number(prodSeleccionado.quantity) < cantidadNum) {
            setError(`Stock insuficiente. Disponible actual: ${prodSeleccionado.quantity}`);
            return;
        }

        // Actualizar el stock del producto
        const nuevoStock =
            tipoMovimiento === 'Entrada'
                ? Number(prodSeleccionado.quantity) + cantidadNum
                : Number(prodSeleccionado.quantity) - cantidadNum;

        const productosActualizados = productos.map((prod) =>
            String(prod.id) === String(productoId) ? { ...prod, quantity: nuevoStock } : prod
        );
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
                            {productos.map((p) => (
                                <option key={p.id} value={p.id}>
                                    {p.name} (Stock actual: {p.quantity})
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

            {/* Historial de movimientos recientes */}
            <div style={{ backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '8px' }}>
                <h3>Movimientos Recientes</h3>

                {movimientos.length === 0 ? (
                    <p>No hay movimientos registrados aún.</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #444' }}>
                                <th style={{ padding: '10px' }}>Fecha</th>
                                <th style={{ padding: '10px' }}>Producto</th>
                                <th style={{ padding: '10px' }}>Tipo</th>
                                <th style={{ padding: '10px' }}>Cantidad</th>
                                <th style={{ padding: '10px' }}>Motivo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movimientos.map((mov) => (
                                <tr key={mov.id} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '10px' }}>{mov.fecha}</td>
                                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{mov.productoNombre}</td>
                                    <td style={{ padding: '10px' }}>
                                        <span
                                            style={{
                                                padding: '4px 8px',
                                                borderRadius: '4px',
                                                backgroundColor: mov.tipo === 'Entrada' ? '#1b5e20' : '#b71c1c',
                                                fontSize: '0.85em',
                                            }}
                                        >
                                            {mov.tipo}
                                        </span>
                                    </td>
                                    <td style={{ padding: '10px' }}>{mov.cantidad}</td>
                                    <td style={{ padding: '10px', color: '#aaa' }}>{mov.motivo}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}