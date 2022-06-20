import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { AuthContextProvider } from "../../store/AuthContext";

import { FilterContextProvider } from "../../store/FilterContext";
import Home from "./Home";

const propsAuthData = require("../../store/AuthDummyContext.json");

const propsFilterData = require("../../store/FilterDummyContext.json");

// describe("Home Title", () => {
test("renders home title correct", () => {
  render(
    <AuthContextProvider data={propsAuthData}>
      <FilterContextProvider data={propsFilterData}>
        <Home />
      </FilterContextProvider>
    </AuthContextProvider>
  );
  const title = screen.getByText(/Welcome Mr Chang!/i);
  expect(title).toBeInTheDocument();
});
// });
