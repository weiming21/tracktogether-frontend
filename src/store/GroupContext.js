import React, { useState } from "react";
// import AuthContext from "./AuthContext";

const GroupContext = React.createContext({
  group: [],
  //   isDataFetched: false,
  //   login: () => {},
  datalog: () => {},
  //   logout: () => {},
});

export const GroupContextProvider = (props) => {
  //   const authCtx = useContext(AuthContext);
  const initialGroup = JSON.parse(localStorage.getItem("group"));
  console.log(initialGroup);
  const [group, setGroup] = useState(initialGroup);

  //   const [groupDataFetched, setGroupDataFetched] = useState(false);

  // const [optionState, setOptionState] = useState("Category");

<<<<<<< HEAD
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
=======
  //   console.log(group);
  //   console.log(authCtx.isDataFetched);
  //   console.log(authCtx.username);
  //   console.log(group);
  //   console.log(authCtx.isDataFetched);
  //   console.log(groupDataFetched);
  //   console.log(authCtx.token);
  //   if (!groupDataFetched && authCtx.isDataFetched) {
  //     const url = "http://localhost:8080/api/group/summary/" + authCtx.username;
  //     console.log("fetching data in group context");
  //     fetch(url)
  //       .then((res) => {
  //         if (res.ok) {
  //           return res.json();
  //         } else {
  //           return res.json().then((data) => {
  //             let errorMessage; // = 'Authentication failed!';
  //             console.log(JSON.stringify(data));
  //             if (data && data.error && data.error.message) {
  //               errorMessage = data.error.message;
  //             }
  //             console.log(errorMessage);

  //             throw new Error(errorMessage);
  //           });
  //         }
  //       })
  //       .then((data) => {
  //         loginData(data);
  //         setGroupDataFetched(true);
  //       })
  //       .catch((err) => {
  //         alert(err.message);
  //       });
  //   }
>>>>>>> 09f577da72042f4ea5814e84777332a4ff204fdb

  // const initialId = localStorage.getItem("id");
  //   const userIsLoggedIn = !!token;

  //   const loginHandler = (token) => {
  //     setToken(token);
  //     localStorage.setItem("token", token);
  //   };

  const loadData = (group) => {
    console.log(group);
    setGroup(group);
    localStorage.setItem("group", JSON.stringify(group));
  };

  //   const logoutHandler = () => {
  //     setToken(null);
  //     localStorage.removeItem("token");
  //     // localStorage.removeItem("id");
  //   };

  const contextValue = {
    group: group,
    // isDataFetched: groupDataFetched,
    // username: username,
    // email: email,
    // contact: contact,
    // image: image,
    // isLoggedIn: userIsLoggedIn,
    // isDataFetched: dataFetched,

    // login: loginHandler,
    datalog: loadData,
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
