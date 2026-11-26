import React from 'react';
import { render, screen, act } from '@testing-library/react';
import ProtectedRoute from './ProtectedRoute';
import { isSessionActive, closeSession } from './auth';

jest.mock('./auth', () => ({
  isSessionActive: jest.fn(),
  closeSession: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

test('allows access when the session is active', () => {
  isSessionActive.mockReturnValue(true);

  render(
    <ProtectedRoute>
      <h1>Inventario privado</h1>
    </ProtectedRoute>
  );

  expect(screen.getByText('Inventario privado')).toBeInTheDocument();
});

test('blocks access when there is no active session', () => {
  isSessionActive.mockReturnValue(false);

  render(
    <ProtectedRoute>
      <h1>Inventario privado</h1>
    </ProtectedRoute>
  );

  expect(screen.queryByText('Inventario privado')).not.toBeInTheDocument();
});

test('blocks access when the session expires', () => {
  jest.useFakeTimers();

  isSessionActive
    .mockReturnValueOnce(true)
    .mockReturnValue(false);

  render(
    <ProtectedRoute>
      <h1>Inventario privado</h1>
    </ProtectedRoute>
  );

  expect(screen.getByText('Inventario privado')).toBeInTheDocument();

  act(() => {
    jest.advanceTimersByTime(5000);
  });

  expect(screen.queryByText('Inventario privado')).not.toBeInTheDocument();
  expect(closeSession).toHaveBeenCalled();
});