import React, { useContext } from "react";
import styles from "./PaymentForm.module.css";
import AuthContext from "../../../store/AuthContext";
import {
  //   Tabs,
  //   Tab,
  // Table,
  //   Stack,
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  CloseButton,
  //   Container,
  // Card,
  // Image,
  // Popover,
  // OverlayTrigger,
} from "react-bootstrap";

function PaymentForm() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const dummyData = [
    {
      username: "John",
      amount: 10,
    },
    {
      username: "Ben",
      amount: 20,
    },
  ];

  return (
    <>
      {/* <h2 className={styles.header}> This Group </h2> */}
      <Row xs={1} xl={2}>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="paymentFormDescription">
              <Form.Label>Description </Form.Label>
              <Form.Control placeholder="Enter Description" />
            </Form.Group>
            <Form.Group className="my-4" controlId="paymentFormSplit">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Split Evenly?"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="paymentFormAmount">
              <Form.Label>Amount </Form.Label>
              <Form.Control type="Number" placeholder="Enter Amount" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="paymentFormCategory">
              <Form.Label>Category </Form.Label>
              <Form.Select>
                <option> Food </option>
                <option> Transport </option>
                <option> Bills </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="paymentFormMembers">
              <Form.Label>Members </Form.Label>
              <Row className="align-items-right">
                <Col xs="auto">
                  <Form.Select>
                    <option> All </option>
                    <option> John </option>
                    <option> Ben </option>
                  </Form.Select>
                </Col>
                <Col xs="auto">
                  <Button> Add Members </Button>{" "}
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <ListGroup>
            <ListGroup.Item className={styles.memberListTitle}>
              <Row>
                <Col xs={9} className={styles.memberList}>
                  <p className="my-2"> Name</p>
                </Col>
                <Col xs={2}>
                  <p className="my-2 ms-auto"> Amount </p>
                </Col>
                <Col xs={1}>
                  <p className="my-2"> Action </p>
                </Col>
              </Row>
            </ListGroup.Item>
            {dummyData.map((entry) => {
              return (
                <ListGroup.Item>
                  <Row>
                    <Col xs={9} className={styles.memberList}>
                      <p className="my-0"> {entry.username}</p>
                    </Col>
                    <Col xs={2}>
                      <p className="my-0 ms-auto"> {entry.amount} </p>
                    </Col>
                    <Col xs={1}>
                      <CloseButton />
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default PaymentForm;
