import { render, screen } from '@testing-library/react';
import App from './App';

test('renders StockWise landing page', () => {
  render(<App />);

  expect(screen.getAllByText('StockWise')).toHaveLength(2);
  expect(
  screen.getByRole('heading', { level: 1, name: /Tu inventario/i })
).toBeInTheDocument();
});