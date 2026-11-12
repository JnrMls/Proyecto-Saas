import MovimientosInventario from './Pages/MovimientosInventario';
import React, { useState } from 'react';
import Products from './Pages/Products';
import './App.css'

const features = [
  {
    icon: '📦',
    title: 'Gestión de productos',
    description: 'Organiza tus productos y administra la información de tu inventario en un solo lugar.',
  },
  {
    icon: '📊',
    title: 'Control de inventario',
    description: 'Consulta las existencias y lleva un seguimiento de los movimientos de inventario.',
  },
  {
    icon: '🔔',
    title: 'Alertas de inventario',
    description: 'Identifica los productos que necesitan ser reabastecidos.',
  },
  {
    icon: '📈',
    title: 'Información del negocio',
    description: 'Consulta la información de tu inventario para tomar mejores decisiones.',
  },
]

function App() {
  const [vista, setVista] = useState('inicio');

  // Estado compartido entre Productos, Movimientos y el futuro Dashboard
  const [products, setProducts] = useState([
    { id: 1, name: 'Arroz', category: 'Alimentos', quantity: 25, price: 4000 },
    { id: 2, name: 'Teclado Mecánico', category: 'Tecnología', quantity: 15, price: 120000 },
    { id: 3, name: 'Mouse Inalámbrico', category: 'Tecnología', quantity: 4, price: 55000 },
  ]);

  const [movimientos, setMovimientos] = useState([]);
  
  return (
    <div className="app">
      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">S</span>
          StockWise
        </a>

        <nav className="nav-links" aria-label="Navegación principal">
          <a href="#home" onClick={() => setVista('inicio')}>Inicio</a>
          <a href="#features" onClick={() => setVista('inicio')}>Funcionalidades</a>
          <a href="#how-it-works" onClick={() => setVista('inicio')}>¿Cómo funciona?</a>
          <a href="#productos" onClick={(e) => { e.preventDefault(); setVista('productos'); }}>Productos</a>
          <a href="#movimientos" onClick={(e) => { e.preventDefault(); setVista('movimientos'); }}>Movimientos</a>
        </nav>

        <a href="#features" className="nav-button">
          Comenzar
        </a>
      </header>
      {vista === 'productos' ? (
        <Products products={products} setProducts={setProducts} />
      ) : vista === 'movimientos' ? (
        <MovimientosInventario
          productos={products}
          onActualizarStock={setProducts}
          movimientos={movimientos}
          setMovimientos={setMovimientos}
        />
      ) : (
      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow">
              GESTIÓN INTELIGENTE DE INVENTARIOS
            </span>

            <h1>
              Tu inventario.
              <br />
              <span>Bajo control.</span>
            </h1>

            <p>
              Simplifica la gestión de tu inventario con StockWise.
              Organiza tus productos, consulta las existencias
              y toma mejores decisiones para tu negocio.
            </p>

            <div className="hero-actions">
              <a href="#features" className="primary-button">
                Explorar funcionalidades
              </a>

              <a href="#how-it-works" className="secondary-button">
                ¿Cómo funciona?
              </a>
            </div>

            <div className="hero-note">
              <span className="status-dot"></span>
              Pensado para pequeños negocios en crecimiento
            </div>
          </div>

          <div className="hero-visual">
            <div className="preview-label">
              STOCKWISE / RESUMEN
            </div>

            <div className="preview-header">
              <div>
                <span className="preview-caption">
                  RESUMEN DEL INVENTARIO
                </span>
                <h2>Tu negocio de un vistazo</h2>
              </div>
              <span className="preview-badge">Demo</span>
            </div>

            <div className="preview-stats">
              <div className="stat-card">
                <span>Total de productos</span>
                <strong>248</strong>
                <small>Productos registrados</small>
              </div>

              <div className="stat-card">
                <span>Unidades disponibles</span>
                <strong>1.842</strong>
                <small>En el inventario</small>
              </div>

              <div className="stat-card warning">
                <span>Existencias bajas</span>
                <strong>08</strong>
                <small>Requieren atención</small>
              </div>
            </div>

            <div className="preview-table">
              <div className="table-heading">
                <strong>Productos recientes</strong>
                <span>Datos de ejemplo</span>
              </div>

              <div className="product-row">
                <span> Camiseta básica</span>
                <span className="stock-ok">Disponible</span>
              </div>
              <div className="product-row">
                <span> Cuaderno</span>
                <span className="stock-low">Existencias bajas</span>
              </div>
              <div className="product-row">
                <span> Mochila</span>
                <span className="stock-ok">Disponible</span>
              </div>
            </div>
          </div>
        </section>

        <section className="features section" id="features">
          <div className="section-heading">
            <span className="section-label">¿POR QUÉ STOCKWISE?</span>
            <h2>Todo lo que necesitas para organizar tu inventario.</h2>
            <p>
              Herramientas sencillas para facilitar el control
              del inventario de pequeños negocios.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="how-section section" id="how-it-works">
          <div className="section-heading">
            <span className="section-label">¿CÓMO FUNCIONA?</span>
            <h2>Organiza tu inventario en tres pasos.</h2>
          </div>

          <div className="steps-grid">
            <div className="step">
              <span>01</span>
              <h3>Registra tus productos</h3>
              <p>Agrega y organiza los productos de tu negocio.</p>
            </div>
            <div className="step">
              <span>02</span>
              <h3>Controla las existencias</h3>
              <p>Consulta las unidades disponibles y los movimientos de inventario.</p>
            </div>
            <div className="step">
              <span>03</span>
              <h3>Mantente informado</h3>
              <p>Identifica productos con pocas existencias y planifica su reposición.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <span className="section-label">ORGANIZA TU NEGOCIO</span>
          <h2>Toma el control de tu inventario.</h2>
          <p>
            Facilita la gestión de tus productos con StockWise.
          </p>
          <a href="#features" className="cta-button">
            Conoce StockWise
          </a>
        </section>
      </main>
      )}
      <footer className="footer">
        <span className="footer-brand">StockWise</span>
        <span>Gestión de inventarios para pequeños negocios.</span>
        <span>© 2026 StockWise</span>
      </footer>
    </div>
  )
}

export default App

