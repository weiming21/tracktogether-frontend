import Navigator from '../../components/navbar/Navigator';
import SideNavigator from '../../components/sidebar/SideNavigator';
import Box from '../../components/Box';
import styles from './Personal.module.css';
import React, { useState, useRef, useEffect, useContext } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AuthContext from '../../store/AuthContext';
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
} from 'react-bootstrap';

function Personal() {
  const authCtx = useContext(AuthContext);
  // console.log(authCtx.id + " personal");
  // console.log(authCtx.isFetchingData + " Context Fetching Data");

  const [currData, setCurrData] = useState([]);
  useEffect(() => {
    console.log(authCtx.isFetchingData + ' use effect frames');
    if (authCtx.isDataFetched) {
      const url = 'http://localhost:8080/api/account/' + authCtx.id;
      console.log('fetching data in personal ' + url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => setCurrData(data))
        .catch((error) =>
          setCurrData(`Unable to retrieve quote. Error: ${error}`),
        );
    }
  }, [authCtx]);

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
    const url = 'http://localhost:8080/api/account/' + authCtx.id;
    console.log(url);
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(newData),
      headers: {
        'Content-Type': 'application/json',
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
    <React.Fragment style={{ overflow: 'auto' }}>
      <Navigator />
      <div style={{ display: 'flex', height: '100%', overflow: 'auto' }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <Row className="align-items-center pb-3">
              <Col xs="auto">
                {' '}
                <h2 className={styles.header}>Transaction Log</h2>{' '}
              </Col>
              <Col xs="auto">
                {' '}
                <Button onClick={handleTransactionForm}>
                  {' '}
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
                  overlay={popover}>
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
