import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  id: "",
  username: "",
  email: "",
  contact: "",
  isLoggedIn: false,
  isDataFetched: false,
  login: () => {},
  datalog: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [contact, setContact] = useState(null);

  const [dataFetched, setDataFetched] = useState(false);

  const [optionState, setOptionState] = useState("Category");

  if (!dataFetched && initialToken != null) {
    const url = "http://localhost:8080/api/account/refresh";
    console.log("fetching data in auth context");
    fetch(url, {
      method: "GET",
      // body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + initialToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage; // = 'Authentication failed!';
            console.log(JSON.stringify(data));
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(errorMessage);

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        loginData(data.data.account);
        console.log("Successfully refreshed!");
        setDataFetched(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // const initialId = localStorage.getItem("id");
  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const loginData = (account) => {
    console.log(account);
    setId(account._id);
    setUsername(account.username);
    setEmail(account.email);
    setContact(account.contact);
    // localStorage.setItem("id", account._id);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    // localStorage.removeItem("id");
  };

  const contextValue = {
    token: token,
    id: id,
    username: username,
    email: email,
    contact: contact,
    isLoggedIn: userIsLoggedIn,
    isDataFetched: dataFetched,
    login: loginHandler,
    datalog: loginData,
    logout: logoutHandler,
    optionState: optionState,
    setOptionState: setOptionState,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
