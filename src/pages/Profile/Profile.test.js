import { render, screen } from "../../test-utils/testing-library-utils";
import "@testing-library/jest-dom";
import Profile from "./Profile";

test("renders profile title correct", () => {
  render(<Profile />);
  const inputFields = screen.getAllByRole("textbox");
  expect(inputFields).toHaveLength(5);
});
