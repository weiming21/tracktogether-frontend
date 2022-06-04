import React, { useState } from "react";

const FilterContext = React.createContext({
  optionState: [],

  setOptionState: () => {},
  addFilter: () => {},
  deleteFilter: () => {},
});

export const FilterContextProvider = (props) => {
  const [optionState, setOptionState] = useState([]);

  const [currData, setCurrData] = useState([]);

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

  const filterAll = () => {
    let dataStream = currData;
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
    optionState: optionState,
    currData: currData,
    // localData: localData,
    setOptionState: setOptionState,
    setCurrData: setCurrData,
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
