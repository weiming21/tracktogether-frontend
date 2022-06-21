import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Box from "./index";

test("renders the text in Box correctly", () => {
  render(
    <Box>
      <h1>Welcome</h1>
    </Box>,
  );
  const header = screen.getByRole("heading");
  expect(header).toHaveTextContent("Welcome");
});
