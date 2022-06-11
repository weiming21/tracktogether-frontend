// import React, { useState } from "react";

// const GroupContext = React.createContext({
//   group: [],
//   isDataFetched: false,
//   //   login: () => {},
//   //   datalog: () => {},
//   //   logout: () => {},
// });

// export const GroupContextProvider = (props) => {
//   const token = localStorage.getItem("token");

//   const [group, setGroup] = useState([]);
//   const [dataFetched, setDataFetched] = useState(false);

//   // const [optionState, setOptionState] = useState("Category");

//   if (!dataFetched) {
//     const url = "http://localhost:8080/api/group/summary/";
//     console.log("fetching data in group context");
//     fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: "Bearer " + token,
//       },
//     })
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
//         console.log(data);
//         setGroup(data.data.groups);
//         setDataFetched(true);
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   }

//   const contextValue = {
//     group: group,
//     isDataFetched: dataFetched,
//   };

//   return (
//     <GroupContext.Provider value={contextValue}>
//       {props.children}
//     </GroupContext.Provider>
//   );
// };

// export default GroupContext;
