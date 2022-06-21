import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "../store/AuthContext";
import { FilterContextProvider } from "../store/FilterContext";
import { GroupContextProvider } from "../store/GroupContext";
// const propsAuthData = require("../store/AuthDummyContext.json");
// const propsFilterData = require("../store/FilterDummyContext.json");
// const propsGroupData = require("../store/GroupDummyContext.json");
const authToken = process.env.REACT_APP_AUTH_TOKEN;

const AllTheProviders = ({ children }) => {
  return (
    <Router>
      <AuthContextProvider token={authToken}>
        <FilterContextProvider token={authToken}>
          <GroupContextProvider token={authToken}>
            {children}
          </GroupContextProvider>
        </FilterContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
