import React, { useState } from 'react';
import { validarProducto } from '../../Utils/inventario';

function ProductForm({ onAddProduct, onCancel }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensajeError = validarProducto({ name, category, quantity, price });
    if (mensajeError) {
      setError(mensajeError);
      return;
    }
    setError('');

    const newProduct = {
      id: Date.now(),
      name: name.trim(),
      category: category.trim(),
      quantity: Number(quantity),
      price: Number(price)
    };

    onAddProduct(newProduct);

    setName('');
    setCategory('');
    setQuantity('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Registrar nuevo producto</h2>

      {error && <p style={{ color: '#b91c1c' }}>{error}</p>}

      <label>Nombre del producto</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ej. Arroz"
        required
      />

      <label>Categoría</label>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Ej. Alimentos"
        required
      />

      <label>Cantidad inicial</label>
      <input
        type="number"
        min="0"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="Ej. 25"
        required
      />

      <label>Precio unitario</label>
      <input
        type="number"
        min="0"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="Ej. 4000"
        required
      />

      <button type="submit">Guardar producto</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}

export default ProductForm;