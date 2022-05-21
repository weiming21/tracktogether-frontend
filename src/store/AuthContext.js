import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  username: '',
  email: '',
  phone: '',
  isLoggedIn: false,
  login: (token) => {},
  datalog: (account) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
  };

  const loginData = (account) => {
    setUsername(account.username);
    setEmail(account.email);
    setPhone(account.phone);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    username: username,
    email: email,
    phone: phone,
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
