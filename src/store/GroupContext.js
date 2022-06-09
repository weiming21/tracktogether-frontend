import React, { useContext, useState } from "react";
import AuthContext from "./AuthContext";

const GroupContext = React.createContext({
  group: [],
  isDataFetched: false,
  //   login: () => {},
  //   datalog: () => {},
  //   logout: () => {},
});

export const GroupContextProvider = (props) => {
  const authCtx = useContext(AuthContext);
  const [group, setGroup] = useState([]);

  const [dataFetched, setDataFetched] = useState(false);

  // const [optionState, setOptionState] = useState("Category");

  if (!dataFetched && authCtx.isDataFetched) {
    const url = "http://localhost:8080/api/group/summary/" + authCtx.username;
    console.log("fetching data in group context");
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: authCtx.username,
      }),
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
        console.log(data);
        setGroup(data.data.groups);
        setDataFetched(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  // const initialId = localStorage.getItem("id");
  //   const userIsLoggedIn = !!token;

  //   const loginHandler = (token) => {
  //     setToken(token);
  //     localStorage.setItem("token", token);
  //   };

  //   const loginData = (account) => {
  //     console.log(account);
  //     setId(account._id);
  //     setUsername(account.username);
  //     setEmail(account.email);
  //     setContact(account.contact);
  //     setImage(account.image);
  //     // localStorage.setItem("id", account._id);
  //   };

  //   const logoutHandler = () => {
  //     setToken(null);
  //     localStorage.removeItem("token");
  //     // localStorage.removeItem("id");
  //   };

  const contextValue = {
    group: group,
    isDataFetched: dataFetched,
    // username: username,
    // email: email,
    // contact: contact,
    // image: image,
    // isLoggedIn: userIsLoggedIn,
    // isDataFetched: dataFetched,

    // login: loginHandler,
    // datalog: loginData,
    // logout: logoutHandler,
    // optionState: optionState,
    // setOptionState: setOptionState,
  };

  return (
    <GroupContext.Provider value={contextValue}>
      {props.children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
