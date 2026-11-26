import React, { useState } from 'react';
import '../Styles/Login.css';

function Login({ onLogin, onBack }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const success = onLogin(password);

    if (!success) {
      setError('La contraseña ingresada es incorrecta.');
      setPassword('');
      return;
    }

    setError('');
  };

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <span className="brand-icon">S</span>
          <span>StockWise</span>
        </div>

        <span className="login-label">ACCESO AL SISTEMA</span>
        <h1>¡Bienvenido!</h1>
        <p>Ingresa la contraseña compartida para acceder a tu inventario.</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Ingresa tu contraseña"
            required
          />

          {error && <p className="login-error" role="alert">{error}</p>}

          <button type="submit" className="login-button">
            Iniciar sesión
          </button>
        </form>

        <button type="button" className="login-back" onClick={onBack}>
          Volver al inicio
        </button>
      </section>
    </main>
  );
}

export default Login;
