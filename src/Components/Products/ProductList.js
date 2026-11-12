
import React from 'react';

function ProductList({ products, onDeleteProduct }) {
  const getStockStatus = (quantity) => {
    if (quantity === 0) {
      return 'Agotado';
    }

    if (quantity <= 5) {
      return 'Stock bajo';
    }

    return 'Disponible';
  };

  return (
    <div className="product-list">
      <h2>Productos registrados</h2>

      {products.length === 0 ? (
        <p>No hay productos registrados todavía.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  ${product.price.toLocaleString('es-CO')}
                </td>
                <td>{getStockStatus(product.quantity)}</td>
                <td>
                  <button
                    onClick={() => onDeleteProduct(product.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductList;
