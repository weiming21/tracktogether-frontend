import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import styles from "./Personal.module.css";
import React, { useState, useRef } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Table,
  // Stack,
  Button,
  // Dropdown,
  // DropdownButton,
  Modal,
  Form,
  Row,
  Col,
  Popover,
  OverlayTrigger,
  // CloseButton,
} from "react-bootstrap";
function Personal() {
  const data = [
    {
      Date: "21/5/2022",
      TransactionName: "Restaurant ABC Prawn Aglio Olio",
      Category: "Food",
      Amount: "26.80",
      TransactionMode: "Bank",
    },
    {
      Date: "22/5/2022",
      TransactionName: "Blk123 Chicken Rice",
      Category: "Food",
      Amount: "5.2",
      TransactionMode: "Bank",
    },
    {
      Date: "23/5/2022",
      TransactionName: "Ez-Link Top-up",
      Category: "Travel",
      Amount: "20.00",
      TransactionMode: "Bank",
    },
    {
      Date: "24/5/2022",
      TransactionName: "Transfer to Chang",
      Category: "Food",
      Amount: "10.60",
      TransactionMode: "Paylah",
    },
  ];
  const [currData, setCurrData] = useState(data);

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
    setCurrData([
      ...currData,
      {
        Date: enteredDate,
        TransactionName: enteredTransName,
        Category: enteredCategory,
        Amount: enteredAmount,
        TransactionMode: enteredTransMode,
      },
    ]);

    setTransactionForm(false);
  };
  const popover = (
    <Popover id="popover-basic">
      <Popover.Header>Filter By</Popover.Header>

      <Popover.Body>
        <Form.Group>
          <Form.Label> Choose Variable </Form.Label>
          <Form.Select placeholder="Enter category">
            <option> Category </option>
            <option> Transport </option>
            <option> Bills </option>
          </Form.Select>
        </Form.Group>
      </Popover.Body>
      {/* <CloseButton /> */}
    </Popover>
  );

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
                <Button onClick={handleTransactionForm}>
                  {" "}
                  Add Transaction
                </Button>
              </Col>
              <Col xs="auto">
                <Form.Text>Sort By</Form.Text>
              </Col>
              <Col xs="auto">
                <Form.Select placeholder="Enter category">
                  <option> Category </option>
                  <option> Transport </option>
                  <option> Bills </option>
                </Form.Select>
              </Col>
              <Col xs="auto">
                <OverlayTrigger
                  trigger="click"
                  placement="right"
                  overlay={popover}
                >
                  <FilterAltIcon />
                </OverlayTrigger>
              </Col>
            </Row>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Transaction Name</th>
                  <th>Category</th>
                  <th>Amount</th>
                  <th>Transaction Mode</th>
                </tr>
              </thead>
              <tbody>
                {currData.map((entry) => {
                  return (
                    <tr>
                      <td>{entry.Date}</td>
                      <td>{entry.TransactionName}</td>
                      <td>{entry.Category}</td>
                      <td>{entry.Amount}</td>
                      <td>{entry.TransactionMode}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Box>
        </div>
      </div>

      <Modal show={transactionForm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Transaction</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                ref={dateInput}
                type="date"
                placeholder="Enter Date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTransaction">
              <Form.Label>Transaction name</Form.Label>
              <Form.Control
                ref={transNameInput}
                placeholder="Enter transaction name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select ref={categoryInput} placeholder="Enter category">
                <option> Food </option>
                <option> Transport </option>
                <option> Bills </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                ref={amountInput}
                type="number"
                placeholder="Enter amount"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicMode">
              <Form.Label>Transaction mode</Form.Label>
              <Form.Control
                ref={transModeInput}
                placeholder="Enter transaction mode"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddTransaction}>
            Add Transaction
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default Personal;
