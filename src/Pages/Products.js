
import React, { useState } from 'react';
import ProductForm from '../Components/Products/ProductForm';
import ProductList from '../Components/Products/ProductList';
import '../Styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddProduct = (newProduct) => {
    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct
    ]);

    setShowForm(false);
  };

  const handleDeleteProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== id)
    );
  };

  return (
    <main className="products-page">
      <div className="products-header">
        <div>
          <h1>Gestión de productos</h1>
          <p>Administra y consulta los productos de tu inventario.</p>
        </div>

        <button
          className="add-product-button"
          onClick={() => setShowForm(true)}
        >
          + Agregar producto
        </button>
      </div>

      {showForm && (
        <ProductForm
          onAddProduct={handleAddProduct}
          onCancel={() => setShowForm(false)}
        />
      )}

      <ProductList
        products={products}
        onDeleteProduct={handleDeleteProduct}
      />
    </main>
  );
}

export default Products;