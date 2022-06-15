import React, { useState } from "react";

const GroupContext = React.createContext({
  group: [],
  isDataFetched: false,
  //   login: () => {},
  //   datalog: () => {},
  validateGroupWithID: () => {},
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

  const findUserIDWithName = (groupID, username) => {
    let userID = 0;
    group.forEach((group) => {
      if (group.groupID.toString() === groupID) {
        group.users.forEach((user) => {
          if (user.username === username) {
            userID = user.userID;
          }
        });
      }
    });
    console.log(userID);
    return userID;
  };

  const updateGroupInformation = (groupID, newGroupInformation) => {
    let newGroupArray = [...group];
    newGroupArray = newGroupArray.map((group) => {
      if (group.groupID.toString() === groupID) {
        return newGroupInformation;
      }
      return group;
    });
    setGroup(newGroupArray);
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

  const validateGroupWithID = (groupID) => {
    let newGroupArray = [...group];
    newGroupArray = newGroupArray.map((group) => group.groupID);
    console.log(newGroupArray.includes(groupID));
    return newGroupArray.includes(groupID);
  };

  const findNotifications = (username) => {
    const finalArray = [];
    group.forEach((entry) => {
      entry.log.forEach((log) => {
        if (log.username === username && log.status == false) {
          const json = {
            ...log,
            groupName: entry.name,
          };
          finalArray.push(json);
        }
      });
    });
    return finalArray;
  };

  const contextValue = {
    group: group,
    setGroup: setGroup,
    isDataFetched: dataFetched,
    logout: logoutHandler,
    findGroupWithID: findGroupWithID,
    findUserIDWithName: findUserIDWithName,
    updateGroupInformation: updateGroupInformation,
    updateGroupWithID: updateGroupWithID,
    deleteGroupWithID: deleteGroupWithID,
    validateGroupWithID: validateGroupWithID,
    findNotifications: findNotifications,
  };

  return (
    <GroupContext.Provider value={contextValue}>
      {props.children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
