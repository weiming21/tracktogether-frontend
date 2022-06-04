// import styles from "./Personal.module.css";
import React, { useContext } from "react";
import FilterContext from "../../store/FilterContext";

import { Form, Popover } from "react-bootstrap";

import DateFilter from "./FilterCateogryComponents/DateFilter";
import CategoryFilter from "./FilterCateogryComponents/CategoryFilter";
import AmountFilter from "./FilterCateogryComponents/AmountFilter";
import TransactionModeFilter from "./FilterCateogryComponents/TransactionModeFilter";

const FilterComponent = (props) => {
  const index = props.index;
  const filterCtx = useContext(FilterContext);
  const optionState = filterCtx.optionState[index];
  const localData = props.localData;
  const setLocalData = props.setLocalData;

  function handleOption(e) {
    filterCtx.changeFilterVariable(index, e.target.value);
    filterCtx.refresh(index);
    // setLocalData(currData);
    const newData = filterCtx.filterAll();
    setLocalData(newData);
  }

  return (
    <Popover.Body className="border-bottom pb-0">
      <Form.Group>
        <Form.Label> Choose Variable </Form.Label>
        <Form.Select
          value={optionState.filterVariable}
          // ref={optionRef}
          onChange={handleOption}
          placeholder="Enter category"
        >
          <option value="Date"> Date </option>
          <option value="Category"> Category </option>
          <option value="Amount"> Amount </option>
          <option value="Transaction Mode"> Transaction Mode </option>
        </Form.Select>
        {optionState.filterVariable == "Date" && (
          <DateFilter
            index={index}
            localData={localData}
            setLocalData={setLocalData}
          />
        )}
        {optionState.filterVariable == "Category" && (
          <CategoryFilter
            index={index}
            localData={localData}
            setLocalData={setLocalData}
          />
        )}
        {optionState.filterVariable == "Amount" && (
          <AmountFilter
            index={index}
            localData={localData}
            setLocalData={setLocalData}
          />
        )}
        {optionState.filterVariable == "Transaction Mode" && (
          <TransactionModeFilter
            index={index}
            localData={localData}
            setLocalData={setLocalData}
          />
        )}
      </Form.Group>
    </Popover.Body>
  );
};

export default FilterComponent;
