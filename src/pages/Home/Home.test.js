import { render, screen } from "@testing-library/react";
import Home from "./Home";

// describe("Home Title", () => {
test("renders home title correct", () => {
  render(<Home />);
  const title = screen.getByText("welcome");
  //   expect(getByText("Welcome")).toBeInTheDocument();

  expect(title).toBeInTheDocument();
});
// });
