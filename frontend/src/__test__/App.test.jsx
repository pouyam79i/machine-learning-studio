import App from "../App";
import { render, screen, fireEvent } from "@testing-library/react";

test("demo", () => {
  expect("true").toBe("true");
});

test("Render the main page", () => {
  render(<App />);
  expect(true).toBeTruthy();
});
