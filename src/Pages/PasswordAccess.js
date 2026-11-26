import React, { useState } from 'react';
import '../Styles/PasswordAccess.css';

export default function PasswordAccess({ onAccess, onBack }) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAccess(password);
    };

    return (
        <main className="password-access">
            <section className="access-card">
                <div className="access-icon" aria-hidden="true">
                    🔒
                </div>

                <h1>Acceso a StockWise</h1>

                <p className="access-description">
                    Ingresa la contraseña para acceder al sistema
                    de gestión de inventarios.
                </p>

                <form className="access-form" onSubmit={handleSubmit}>
                    <div className="access-field">
                        <label htmlFor="password">Contraseña</label>


                        <div className="password-input-wrapper">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Ingresa la contraseña"
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword((previous) => !previous)}
                                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                            >
                                {showPassword ? 'Ocultar' : 'Mostrar'}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="access-button">
                        Ingresar
                    </button>
                </form>

                <button
                    type="button"
                    className="access-back"
                    onClick={onBack}
                >
                    ← Volver al inicio
                </button>
            </section>
        </main>
    );
}
