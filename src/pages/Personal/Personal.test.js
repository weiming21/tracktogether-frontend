// jest.setTimeout(30000);
import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "../../test-utils/testing-library-utils";
import "@testing-library/jest-dom";
import Personal from "./Personal";
import userEvent from "@testing-library/user-event";

test("filter popover appears/disappears on click", async () => {
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
});

test("transaction modal appears/disappears on click", async () => {
  render(<Personal />);
  //Modal starts out hidden
  const nullModal = screen.queryByText(/Add New Transaction/i);
  expect(nullModal).not.toBeInTheDocument();

  //Modal appears on click
  const addModalButton = screen.getByRole("button", {
    name: /Add Transaction/i,
  });
  userEvent.click(addModalButton);
  const transactionModal = screen.queryByText(/Add New Transaction/i);
  expect(transactionModal).toBeInTheDocument();

  // Modal disappears on click
  const cancelModalButton = screen.getByRole("button", {
    name: /Cancel/i,
  });

  userEvent.click(cancelModalButton);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/Add New Transaction/i)
  );
});

test("number of table entries > 0 and <= 15", async () => {
  render(<Personal />);
  const numberOfRowEntries = await screen.findAllByRole("row");
  expect(numberOfRowEntries.length).toBeGreaterThan(0);
  expect(numberOfRowEntries.length).toBeLessThanOrEqual(15);
});

test("filter variable changes dynamically", async () => {
  render(<Personal />);
  //Click on filter icon
  const filterButton = screen.getByRole("button", {
    name: /filter/i,
  });
  userEvent.click(filterButton);

  //Wait for popover to appear first
  await waitFor(() =>
    expect(screen.getByText(/Filter By/i)).toBeInTheDocument()
  );

  //Click on add filter button
  const addFilterButton = screen.getByRole("button", {
    name: /addfilter/i,
  });

  userEvent.click(addFilterButton);
  //Check if current input is date
  const categoryFilter = screen.findByText(/Choose Variable/i);

  await waitFor(() => {
    expect(categoryFilter).toBeInTheDocument();
  });

  // const myTimeout = setTimeout(async () => {
  //   //Click on add filter button
  //   const addFilterButton = screen.getByRole("button", {
  //     name: /add-filter/i,
  //   });
  //   userEvent.click(addFilterButton);
  //   //Check if current input is dat
  //   const categoryFilter = await screen.findByLabelText(/choose variable/i);
  //   expect(categoryFilter).toBeInTheDocument();
  // }, 1000);
});
