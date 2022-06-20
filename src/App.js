// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import HomeCard from "./pages/Home/HomeCard";
import PersonalCard from "./pages/Personal/PersonalCard";
import ProfileCard from "./pages/Profile/ProfileCard";
import GroupsCard from "./pages/Groups/GroupsCard";
import GroupDetailsCard from "./pages/Groups/GroupDetailsCard";
import OutstandingCard from "./pages/Outstanding/OutstandingCard";
import AuthContext from "./store/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import "./App.css";
import { FilterContextProvider } from "./store/FilterContext";
import { GroupContextProvider } from "./store/GroupContext";

function App() {
  const authCtx = useContext(AuthContext);
  // const profileURL = "/profile/" + authCtx.username;
  return (
    <div className="App">
      <GroupContextProvider>
        <FilterContextProvider>
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {authCtx.isLoggedIn && (
                <Route path="/Home" element={<HomeCard />} />
              )}

              {authCtx.isLoggedIn && (
                <Route path="/personal" element={<PersonalCard />} />
              )}

              {authCtx.isLoggedIn && (
                <Route path="/profile" element={<ProfileCard />} />
              )}
              {authCtx.isLoggedIn && (
                <Route path="/groups" element={<GroupsCard />} />
              )}
              {authCtx.isLoggedIn && (
                <Route path="/groups/:groupID" element={<GroupDetailsCard />} />
              )}
              {authCtx.isLoggedIn && (
                <Route path="/outstanding" element={<OutstandingCard />} />
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </BrowserRouter>
        </FilterContextProvider>
      </GroupContextProvider>
    </div>
  );
}

export default App;
