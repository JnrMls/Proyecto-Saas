import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";

test("shows the inventory summary and low stock alerts", () => {
  render(<Dashboard />);
  expect(screen.getByText(/Resumen del inventario/i)).toBeInTheDocument();
  expect(screen.getByText(/Productos por reponer/i)).toBeInTheDocument();
});
