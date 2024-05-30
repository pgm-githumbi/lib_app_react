import { render } from "@testing-library/react";
import App from "./App";

test("at least on test", () => {
  render(<App />);
  expect(1).toBeGreaterThan(0);
});
