// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Personal from "./pages/Personal/Personal";
import Profile from "./pages/Profile/Profile";
import Groups from "./pages/Groups/Groups";
import GroupDetails from "./pages/Groups/GroupDetails";
import Outstanding from "./pages/Outstanding/Outstanding";
import AuthContext from "./store/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import { FilterContextProvider } from "./store/FilterContext";

function App() {
  const authCtx = useContext(AuthContext);
  const profileURL = "/profile/" + authCtx.username;
  return (
    <div className="App">
      <FilterContextProvider>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {authCtx.isLoggedIn && <Route path="/Home" element={<Home />} />}

            {authCtx.isLoggedIn && (
              <Route path="/personal" element={<Personal />} />
            )}

            {authCtx.isLoggedIn && (
              <Route path={profileURL} element={<Profile />} />
            )}
            {authCtx.isLoggedIn && (
              <Route path={"/groups"} element={<Groups />} />
            )}
            {authCtx.isLoggedIn && (
              <Route path="/groups/:groupID" element={<GroupDetails />} />
            )}

            {authCtx.isLoggedIn && (
              <Route path={"/outstanding"} element={<Outstanding />} />
            )}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </FilterContextProvider>
    </div>
  );
}

export default App;
