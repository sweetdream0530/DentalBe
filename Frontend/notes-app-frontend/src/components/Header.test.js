import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

test("it should call onLogout when the button is clicked", () => {
  const mockLogout = jest.fn();
  render(<Header onLogout={mockLogout} />);

  const button = screen.getByText(/logout/i);
  fireEvent.click(button);

  expect(mockLogout).toHaveBeenCalledTimes(1);
});
