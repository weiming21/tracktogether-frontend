import React, { useState } from "react";
// import AuthContext from "./AuthContext";

const FilterContext = React.createContext({
  optionState: [],
  isDataFetched: false,
  setOptionState: () => {},
  addFilter: () => {},
  deleteFilter: () => {},
});

export const FilterContextProvider = (props) => {
  const initialToken = localStorage.getItem("token");

  // const token = get

  const [optionState, setOptionState] = useState([]);

  const [currData, setCurrData] = useState([]);
  const [localData, setLocalData] = useState([]);

  const [alertData, setAlertData] = useState([]);

  const [adjustmentData, setAdjustmentData] = useState([]);

  const [logState, setLogState] = useState(0); //0 is trans log, 1 is adjustment log, 2 is both.

  const [dataFetched, setDataFetch] = useState(false);

  // const [localDataFunction, setLocalDataFunction] = useState((props) => {
  //   console.log(props);
  //   return [];
  // });

  console.log("filter Ctx reload");
  console.log(initialToken);
  console.log("datafected " + dataFetched);

  // const [localDataFunction, setLocalDataFunction] = useState(() => {});

  // const [sortCategoryHandlerFunction, setSortCategoryHandlerFunction] =
  //   useState(() => {});

  // const authCtx = useContext(AuthContext);

  // if (!dataFetched) {

  if (!dataFetched && initialToken != null) {
    const url = "http://localhost:8080/api/account/transactions/";
    console.log("fetching data in personal ");
    setDataFetch(true);
    fetch(url, {
      method: "GET",
      // body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + initialToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrData(data.data);
        setLocalData(data.data);
      })
      .catch((error) =>
        setCurrData(`Unable to retrieve quote. Error: ${error}`)
      );

    const alertUrl = "http://localhost:8080/api/account/alerts/";
    fetch(alertUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + initialToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAlertData(data.data.pending);
      })
      .catch((error) =>
        setCurrData(`Unable to retrieve quote. Error: ${error}`)
      );

    const adjustmentUrl = "http://localhost:8080/api/account/adjustment/";
    fetch(adjustmentUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + initialToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const adjustments = data.data.adjustments.map((entry) => {
          const newInfo =
            entry.description.trim() === ""
              ? "No information logged"
              : entry.information;
          const newMode = "Groups";
          const json = {
            date: entry.date,
            information: newInfo,
            category: entry.category,
            amount: entry.amount,
            mode: newMode,
            groupID: entry.groupID,
          };
          return json;
        });
        setAdjustmentData(adjustments);
      })
      .catch((error) =>
        setCurrData(`Unable to retrieve quote. Error: ${error}`)
      );

    // sortCategoryHandlerFunction();
  }

  // const [localData, setLocalData] = useState([]);

  const addFilter = () => {
    const newState = [
      ...optionState,
      {
        filterVariable: "Date",
        dateYear: "All",
        dateMonth: "All",
        category: "All",
        lowerAmount: "",
        upperAmount: "",
        transactionMode: "",
        filterIndividual: () => {},
      },
    ];
    setOptionState(newState);
  };

  const deleteAllFilter = () => {
    // const newState = [...optionState];
    // newState.pop();
    setOptionState([]);
  };

  const changeFilterVariable = (index, newFilter) => {
    const newState = [...optionState];
    newState[index].filterVariable = newFilter;
    setOptionState(newState);
  };

  const changeYear = (index, newYear) => {
    const newState = [...optionState];
    newState[index].dateYear = newYear;
    setOptionState(newState);
  };

  const changeMonth = (index, newMonth) => {
    const newState = [...optionState];
    newState[index].dateMonth = newMonth;
    setOptionState(newState);
  };

  const changeCategory = (index, newCategory) => {
    const newState = [...optionState];
    newState[index].category = newCategory;
    setOptionState(newState);
  };

  const changeLowerAmount = (index, newLowerAmount) => {
    const newState = [...optionState];
    newState[index].lowerAmount = newLowerAmount;
    setOptionState(newState);
  };

  const changeUpperAmount = (index, newUpperAmount) => {
    const newState = [...optionState];
    newState[index].upperAmount = newUpperAmount;
    setOptionState(newState);
  };

  const changeTransactionMode = (index, newMode) => {
    const newState = [...optionState];
    newState[index].transactionMode = newMode;
    setOptionState(newState);
  };

  const changeFilterIndividual = (index, newFilterFunction) => {
    const newState = [...optionState];
    newState[index].filterIndividual = newFilterFunction;
    setOptionState(newState);
  };

  const filterAll = (logType) => {
    let dataStream =
      logType === 0
        ? currData
        : logType === 1
        ? adjustmentData
        : currData.concat(adjustmentData);
    for (let i = 0; i < optionState.length; i++) {
      dataStream = optionState[i].filterIndividual(dataStream);
    }
    return dataStream;
  };

  const refresh = (index) => {
    changeYear(index, "All");
    changeMonth(index, "All");
    changeCategory(index, "All");
    changeLowerAmount(index, "");
    changeUpperAmount(index, "");
    changeTransactionMode(index, "All");
  };

  const contextValue = {
    isDataFetched: dataFetched,
    optionState: optionState,
    currData: currData,
    alertData: alertData,
    adjustmentData: adjustmentData,
    logState: logState,
    setLogState: setLogState,
    // localData: localData,
    setOptionState: setOptionState,
    setCurrData: setCurrData,
    localData: localData,
    setLocalData: setLocalData,
    // setLocalDataFunction: setLocalDataFunction,
    // setSortCategoryHandlerFunction: setSortCategoryHandlerFunction,

    // setLocalData: setLocalData,
    addFilter: addFilter,
    deleteAllFilter: deleteAllFilter,
    changeFilterVariable: changeFilterVariable,
    changeYear: changeYear,
    changeMonth: changeMonth,
    changeCategory: changeCategory,
    changeLowerAmount: changeLowerAmount,
    changeUpperAmount: changeUpperAmount,
    changeTransactionMode: changeTransactionMode,
    changeFilterIndividual: changeFilterIndividual,
    filterAll: filterAll,
    refresh: refresh,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
