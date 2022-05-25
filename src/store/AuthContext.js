import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  username: "",
  email: "",
  contact: "",
  isLoggedIn: false,
  login: () => {},
  datalog: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const initialAccountString = null; //localStorage.getItem("account");

  const initialAccount =
    initialAccountString == null ? null : initialAccountString.json;

  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(
    initialAccount == null ? null : initialAccount.username
  );
  const [email, setEmail] = useState(
    initialAccount == null ? null : initialAccount.email
  );
  const [contact, setContact] = useState(
    initialAccount == null ? null : initialAccount.contact
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const loginData = (account) => {
    setUsername(account.username);
    setEmail(account.email);
    setContact(account.contact);
    localStorage.setItem("account", JSON.stringify(account));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("account");
  };

  const contextValue = {
    token: token,
    username: username,
    email: email,
    contact: contact,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    datalog: loginData,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
