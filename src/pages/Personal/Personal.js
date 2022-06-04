import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import SubmitTransactionModal from "./SubmitTransactionModal";
import styles from "./Personal.module.css";
import React, { useState, useRef, useEffect, useContext } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AddIcon from "@mui/icons-material/Add";
// import RemoveIcon from "@mui/icons-material/Remove";
import AuthContext from "../../store/AuthContext";
import FilterContext from "../../store/FilterContext";

import FilterComponent from "./FilterComponent";

// import Button from "@mui/material/Button";
import {
  Table,
  Stack,
  Button,
  // Dropdown,
  // DropdownButton,
  Form,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  // Modal,
  // CloseButton,
} from "react-bootstrap";

function Personal() {
  const authCtx = useContext(AuthContext);
  const filterCtx = useContext(FilterContext);
  const currData = filterCtx.currData;
  const setCurrData = filterCtx.setCurrData;
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    console.log(authCtx.isFetchingData + " use effect frames");
    if (authCtx.isDataFetched) {
      const url = "http://localhost:8080/api/account/" + authCtx.id;
      console.log("fetching data in personal " + url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCurrData(data);
          setLocalData(data);
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) =>
          setCurrData(`Unable to retrieve quote. Error: ${error}`)
        );
      sortCategoryHandler();
    }
  }, [authCtx]);

  const sortCategory = useRef();
  const [sortDirection, setSortDirection] = useState(true); //True implies descending order
  const handleSortDirection = () => {
    setSortDirection(!sortDirection);
    sortCategoryHandler();
  };

  function sortCategoryHandler() {
    function dataComparator(sortCategoryValue) {
      const numericalSortDirection = sortDirection ? 1 : -1;
      switch (sortCategoryValue) {
        case "Date":
          return (a, b) =>
            numericalSortDirection * (new Date(b.date) - new Date(a.date));
        case "Amount":
          return (a, b) =>
            numericalSortDirection * (Number(b.amount) - Number(a.amount));
        case "Transaction Name":
          return (a, b) =>
            numericalSortDirection * (b.information < a.information ? -1 : 1);
      }
    }

    const newLocalData = [...localData];
    newLocalData.sort(dataComparator(sortCategory.current.value));
    setLocalData(newLocalData);
  }

  const dateInput = useRef();
  const transNameInput = useRef();
  const categoryInput = useRef();
  const amountInput = useRef();
  const transModeInput = useRef();

  const [transactionForm, setTransactionForm] = useState(false);
  const handleClose = () => setTransactionForm(false);
  const handleTransactionForm = () => setTransactionForm(true);
  const handleAddTransaction = () => {
    const enteredDate = dateInput.current.value;
    const enteredTransName = transNameInput.current.value;
    const enteredCategory = categoryInput.current.value;
    const enteredAmount = amountInput.current.value;
    const enteredTransMode = transModeInput.current.value;
    const newData = {
      date: enteredDate,
      category: enteredCategory,
      amount: parseFloat(enteredAmount),
      information: enteredTransName,
      mode: enteredTransMode,
    };
    console.log(newData);
    setCurrData([...currData, newData]);
    setTransactionForm(false);
    const url = "http://localhost:8080/api/account/" + authCtx.id;
    console.log(url);
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage;
            console.log(JSON.stringify(data));
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            console.log(errorMessage);

            throw new Error(errorMessage);
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const [filterArray, setFilterArray] = useState([]);

  const addFilterHandler = () => {
    filterCtx.addFilter();
    setFilterArray([
      ...filterArray,
      {
        displayComponent: (
          <FilterComponent
            index={filterArray.length}
            // optionState={optionState}
            // setOptionState={setOptionState}
            localData={localData}
            setLocalData={setLocalData}
          />
        ),
      },
    ]);
  };
  const removeFilterHandler = () => {
    filterCtx.deleteAllFilter();
    // const newArr = [...filterArray];
    // newArr.pop();
    setFilterArray([]);
    setLocalData(currData);
  };

  const popover = () => {
    return (
      <Popover id="popover-basic">
        <Popover.Header>Filter By</Popover.Header>
        {filterArray.map((entry) => entry.displayComponent)}
        <Popover.Body>
          {" "}
          <Stack direction="horizontal" gap={3}>
            <Button
              className="ms-auto"
              variant="secondary"
              onClick={removeFilterHandler}
            >
              Clear all
            </Button>
            <Button onClick={addFilterHandler}>
              {" "}
              <AddIcon />
            </Button>
          </Stack>
        </Popover.Body>
      </Popover>
    );
  };

  const formProps = {
    dateInput: dateInput,
    transNameInput: transNameInput,
    categoryInput: categoryInput,
    amountInput: amountInput,
    transModeInput: transModeInput,
    transactionForm: transactionForm,
    handleClose: handleClose,
    handleAddTransaction: handleAddTransaction,
  };

  return (
    <React.Fragment>
      <Navigator />
      <div style={{ display: "flex" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <Row className="align-items-center pb-3">
              <Col xs="auto">
                {" "}
                <h2 className={styles.header}>Transaction Log</h2>{" "}
              </Col>
              <Col xs="auto">
                {" "}
                <Button className={styles.btn} onClick={handleTransactionForm}>
                  {" "}
                  Add Transaction
                </Button>
              </Col>
              <Col xs="auto">
                <Form.Text>Sort By</Form.Text>
              </Col>
              <Col xs="auto">
                <Form.Select
                  ref={sortCategory}
                  onChange={sortCategoryHandler}
                  placeholder="Enter category"
                >
                  <option> Date </option>
                  <option> Amount </option>
                  <option> Transaction Name </option>
                </Form.Select>
              </Col>
              <Col xs="auto">
                <Button className={styles.btn} onClick={handleSortDirection}>
                  {sortDirection && <ArrowUpwardIcon />}
                  {!sortDirection && <ArrowDownwardIcon />}
                </Button>
              </Col>

              <Col xs="auto">
                <OverlayTrigger
                  trigger="click"
                  placement="auto"
                  rootClose
                  overlay={popover()}
                >
                  <Button variant="light" className={styles.btn}>
                    <FilterAltIcon />
                  </Button>
                </OverlayTrigger>
              </Col>
            </Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction Name</th>
                  <th>Category</th>
                  <th>Amount($)</th>
                  <th>Transaction Mode</th>
                </tr>
              </thead>
              <tbody>
                {localData.map((entry) => {
                  return (
                    <tr>
                      <td>{new Date(entry.date).toDateString()}</td>
                      <td>{entry.information}</td>
                      <td>{entry.category}</td>
                      <td>{Number(entry.amount).toFixed(2)}</td>
                      <td>{entry.mode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Box>
        </div>
      </div>

      <SubmitTransactionModal formProps={formProps} />
    </React.Fragment>
  );
}

export default Personal;
