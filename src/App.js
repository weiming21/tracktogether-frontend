// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Home from "./pages/Home/Home";
import Personal from "./pages/Personal/Personal";
import Profile from "./pages/Profile/Profile";
import AuthContext from "./store/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import styles from "./App.module.css";

function App() {
  const authCtx = useContext(AuthContext);
  const profileURL = "/profile/" + authCtx.username;
  return (
    <div className={styles.App}>
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
