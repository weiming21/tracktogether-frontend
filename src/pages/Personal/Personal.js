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
import RemoveIcon from "@mui/icons-material/Remove";
import AuthContext from "../../store/AuthContext";
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
  // console.log(authCtx.id + " personal");
  // console.log(authCtx.isFetchingData + " Context Fetching Data");

  const [currData, setCurrData] = useState([]);

  useEffect(() => {
    console.log(authCtx.isFetchingData + " use effect frames");
    if (authCtx.isDataFetched) {
      const url = "http://localhost:8080/api/account/" + authCtx.id;
      console.log("fetching data in personal " + url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setCurrData(data);
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

    const newCurrData = [...currData];
    newCurrData.sort(dataComparator(sortCategory.current.value));
    setCurrData(newCurrData);
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
  const [optionState, setOptionState] = useState("Category");
  const optionRef = useRef("Category");

  const addFilterHandler = () => {
    setFilterArray([
      ...filterArray,
      {
        displayComponent: (
          <FilterComponent
            optionRef={optionRef}
            optionState={optionState}
            setOptionState={setOptionState}
            currData={currData}
            setCurrData={setCurrData}
          />
        ),
      },
    ]);
  };
  const removeFilterHandler = () => {
    const newArr = [...filterArray];
    newArr.pop();
    setFilterArray(newArr);
  };
  console.log(optionState + " after setting state");
  const popover = (
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
            <RemoveIcon />
          </Button>
          <Button onClick={addFilterHandler}>
            {" "}
            <AddIcon />
          </Button>
        </Stack>
      </Popover.Body>
    </Popover>
  );

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

  const [testState, setTestState] = useState("first");

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
                  placement="right"
                  rootClose
                  overlay={popover}
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
                {currData.map((entry) => {
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
          <Box>
            <Form.Select
              value={testState}
              onChange={(e) => {
                console.log(testState + "before");
                setTestState(e.target.value);
                console.log(testState + "after");
              }}
            >
              <option> first </option>
              <option> second </option>
            </Form.Select>
          </Box>
        </div>
      </div>

      <SubmitTransactionModal formProps={formProps} />
    </React.Fragment>
  );
}

export default Personal;
