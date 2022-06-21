import { render, screen } from "../../test-utils/testing-library-utils";
import "@testing-library/jest-dom";
import Home from "./Home";

test("renders home title correct", async () => {
  render(<Home />);
  const title = await screen.findByText(/Welcome Mr Chang!/i);
  expect(title).toBeInTheDocument();
});
