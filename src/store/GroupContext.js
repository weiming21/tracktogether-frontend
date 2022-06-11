import React, { useState } from "react";

const GroupContext = React.createContext({
  group: [],
  isDataFetched: false,
  //   login: () => {},
  //   datalog: () => {},
  logout: () => {},
});

export const GroupContextProvider = (props) => {
  const token = localStorage.getItem("token");
  console.log(token);

  const [group, setGroup] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  console.log("group data fetched: " + dataFetched);
  console.log(group);

  if (!dataFetched && token != null) {
    const url = "http://localhost:8080/api/group/summary/";
    console.log("fetching data in group context");
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
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
        console.log(data.data.groups);
        setGroup(data.data.groups);
        setDataFetched(true);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const logoutHandler = () => {
    setDataFetched(false);
  };

  const findGroupWithID = (groupID) => {
    let baseGroup = {
      groupID: null,
      name: null,
      image: null,
      users: [],
      log: [],
    };

    group.forEach((group) => {
      if (group.groupID.toString() === groupID) {
        baseGroup = group;
      }
    });
    return baseGroup;
  };

  const updateGroupWithID = (groupID, groupName) => {
    let newGroupArray = [...group];
    newGroupArray = newGroupArray.map((group) => {
      if (group.groupID.toString() === groupID) {
        group.name = groupName;
      }
      return group;
    });
    setGroup(newGroupArray);
  };

  const deleteGroupWithID = (groupID) => {
    let newGroupArray = [...group];
    newGroupArray = newGroupArray.filter((group) => {
      if (group.groupID.toString() === groupID) {
        return false;
      }
      return true;
    });
    setGroup(newGroupArray);
  };

  const contextValue = {
    group: group,
    setGroup: setGroup,
    isDataFetched: dataFetched,
    logout: logoutHandler,
    findGroupWithID: findGroupWithID,
    updateGroupWithID: updateGroupWithID,
    deleteGroupWithID: deleteGroupWithID,
  };

  return (
    <GroupContext.Provider value={contextValue}>
      {props.children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
