import {
  validatePassword,
  login,
  startSession,
  isSessionActive,
  closeSession,
} from './auth';

beforeEach(() => {
  localStorage.clear();
});

test('accepts the correct password', () => {
  expect(validatePassword('1234', '1234')).toBe(true);
});

test('rejects an incorrect password', () => {
  expect(validatePassword('1234', '5678')).toBe(false);
});

test('starts an active session', () => {
  startSession();

  expect(isSessionActive()).toBe(true);
});

test('closes the session', () => {
  startSession();
  closeSession();

  expect(isSessionActive()).toBe(false);
});

test('expires the session after its expiration time', () => {
  localStorage.setItem(
    'stockwise_session',
    JSON.stringify({ expiresAt: Date.now() - 1000 })
  );

  expect(isSessionActive()).toBe(false);
});

test('logs in with the correct password', () => {
  const result = login('1234', '1234');

  expect(result).toBe(true);
  expect(isSessionActive()).toBe(true);
});

test('does not log in with an incorrect password', () => {
  const result = login('1234', '5678');

  expect(result).toBe(false);
  expect(isSessionActive()).toBe(false);
});