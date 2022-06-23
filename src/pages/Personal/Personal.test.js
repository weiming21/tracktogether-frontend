import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "../../test-utils/testing-library-utils";
import "@testing-library/jest-dom";
import Personal from "./Personal";
import userEvent from "@testing-library/user-event";

test("filter popover appears on click", async () => {
  render(<Personal />);
  //popover starts out hidden
  const nullPopover = screen.queryByText(/Filter By/i);
  expect(nullPopover).not.toBeInTheDocument();

  //popover appears on click

  const filterButton = screen.getByRole("button", {
    name: /filter/i,
  });

  userEvent.click(filterButton);
  const popover = screen.queryByText(/Filter By/i);
  expect(popover).toBeInTheDocument();

  //popover disappears on click
  userEvent.click(filterButton);
  await waitForElementToBeRemoved(() => screen.queryByText(/Filter By/i));

  //   expect(postPopover).not.toBeInTheDocument();
});
