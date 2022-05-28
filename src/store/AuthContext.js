import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  id: '',
  username: '',
  email: '',
  contact: '',
  isLoggedIn: false,
  login: () => {},
  datalog: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialAccountString = localStorage.getItem('account');
  console.log(initialAccountString);

  const initialAccount =
    initialAccountString == null ? null : JSON.parse(initialAccountString);

  console.log(initialAccount + 'test');

  const [token, setToken] = useState(initialToken);
  const [id, setId] = useState(
    initialAccount == null ? null : initialAccount._id,
  );
  const [username, setUsername] = useState(
    initialAccount == null ? null : initialAccount.username,
  );
  const [email, setEmail] = useState(
    initialAccount == null ? null : initialAccount.email,
  );
  const [contact, setContact] = useState(
    initialAccount == null ? null : initialAccount.contact,
  );

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const loginData = (account) => {
    console.log(account);
    setId(account._id);
    setUsername(account.username);
    setEmail(account.email);
    setContact(account.contact);
    localStorage.setItem('account', JSON.stringify(account));
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('account');
  };

  const contextValue = {
    token: token,
    id: id,
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
