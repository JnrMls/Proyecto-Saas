const SESSION_KEY = 'stockwise_session';
const SESSION_DURATION = 30 * 60 * 1000; // 30 minutos

// Validar la contraseña
export const validatePassword = (password, correctPassword) => {
  return password === correctPassword;
};

// Iniciar sesión si la contraseña es correcta
export const login = (password, correctPassword) => {
  if (!validatePassword(password, correctPassword)) {
    return false;
  }

  startSession();
  return true;
};

// Iniciar sesión
export const startSession = () => {
  const session = {
    expiresAt: Date.now() + SESSION_DURATION,
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

// Comprobar si la sesión sigue activa
export const isSessionActive = () => {
  const storedSession = localStorage.getItem(SESSION_KEY);

  if (!storedSession) {
    return false;
  }

  try {
    const session = JSON.parse(storedSession);

    if (!session.expiresAt || Date.now() >= session.expiresAt) {
      closeSession();
      return false;
    }

    return true;
  } catch {
    closeSession();
    return false;
  }
};

// Cerrar sesión
export const closeSession = () => {
  localStorage.removeItem(SESSION_KEY);
};