import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthContextProvider } from "../../store/AuthContext";
import { FilterContextProvider } from "../../store/FilterContext";
import Home from "./Home";

const propsAuthData = {
  accountDetails: {
    contact: 99118822,
    email: "chang@xyz.com",
    id: "6296d34fb9f5fc8613765e15",
    image:
      "http://localhost:8080/public/2c7648bd-91b6-4368-8ef1-b0136a34cbc0-1655534978207-chang-jing-yan-picture.jpg",
    username: "Chang",
  },
};

const currData = [
  {
    date: "2022-06-01",
    category: "Food",
    amount: 4.5,
    information: "Chicken Rice",
    mode: "Cash",
  },
  {
    date: "2022-05-03",
    category: "Food",
    amount: 3.3,
    information: "Earlier Dinner",
    mode: "Cash",
  },
  {
    date: "2022-06-30",
    category: "Food",
    amount: 1.2,
    information: "Later Chicken Rice",
    mode: "Cash",
  },
  {
    date: "2022-03-31",
    category: "Transport",
    amount: 40,
    information: "Top Up Card",
    mode: "Bank",
  },
  {
    date: "2021-11-02",
    category: "Transport",
    amount: 30,
    information: "Top Up Paylah",
    mode: "Bank",
  },
];

const alertData = [
  {
    group: "27",
    user: "Test",
    contact: 999,
    amount: -16.5,
    payeeHasPaid: false,
  },
  {
    group: "27",
    user: "Test",
    contact: 999,
    amount: -27.5,
    payeeHasPaid: false,
  },
  {
    group: "27",
    user: "Test",
    contact: 999,
    amount: -38.5,
    payeeHasPaid: false,
  },
];

const adjustmentData = [
  {
    date: "2022-06-14T14:41:50.493Z",
    information: "Group information not recorded",
    category: "Food",
    amount: -26,
    mode: "Groups",
  },
  {
    date: "2022-06-14T14:52:21.124Z",
    information: "Group information not recorded",
    category: "Food",
    amount: -82,
    mode: "Groups",
  },
  {
    date: "2022-06-14T14:52:49.091Z",
    information: "Group information not recorded",
    category: "Food",
    amount: 25.43,
    mode: "Groups",
  },
  {
    date: "2022-06-14T14:53:17.727Z",
    information: "Group information not recorded",
    category: "Food",
    amount: -66.67,
    mode: "Groups",
  },
  {
    date: "2022-06-15T04:30:26.712Z",
    information: "Group information not recorded",
    category: "Food",
    amount: -20,
    mode: "Groups",
  },
];

const propsFilterData = {
  currData: currData,
  alertData: alertData,
  adjustmentData: adjustmentData,
};

// describe("Home Title", () => {
test("renders home title correct", () => {
  render(
    <AuthContextProvider data={propsAuthData}>
      <FilterContextProvider data={propsFilterData}>
        <Home />
      </FilterContextProvider>
    </AuthContextProvider>,
  );
  const title = screen.getByText(/Welcome Mr Chang!/i);
  // expect(getByText("Welcome")).toBeInTheDocument();

  expect(title).toBeInTheDocument();
});
// });
