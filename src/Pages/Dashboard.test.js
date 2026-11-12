import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

const products = [
  { id: 1, name: "Arroz", category: "Alimentos", quantity: 25, price: 4000 },
  { id: 3, name: "Mouse Inalámbrico", category: "Tecnología", quantity: 4, price: 55000 },
  { id: 4, name: "Gorra", category: "Accesorios", quantity: 0, price: 28000 },
];

test("shows the summary and the products that need restocking", () => {
  render(<Dashboard products={products} movimientos={[]} />);
  expect(screen.getByText(/Resumen del inventario/i)).toBeInTheDocument();
  expect(screen.getByText("Mouse Inalámbrico")).toBeInTheDocument();
  expect(screen.getByText("Gorra")).toBeInTheDocument();
  expect(screen.queryByText("Arroz")).not.toBeInTheDocument();
});

test("shows empty states when there is no data", () => {
  render(<Dashboard products={[]} movimientos={[]} />);
  expect(screen.getByText(/Aún no hay productos/i)).toBeInTheDocument();
  expect(screen.getByText(/Aún no hay movimientos/i)).toBeInTheDocument();
});
