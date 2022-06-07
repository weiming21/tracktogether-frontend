import React, { useState, useContext } from "react";
import styles from "./GroupComponent.module.css";
import AuthContext from "../../../store/AuthContext";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {
  //   Tabs,
  //   Tab,
  Table,
  //   Stack,
  Button,
  Form,
  Row,
  Col,
  //   ListGroup,
  // CloseButton,
  //   Container,
  // Card,
  // Image,
  // Popover,
  // OverlayTrigger,
} from "react-bootstrap";

function GroupMemberList() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const dummyData = [
    {
      username: "Really",
      contact: 11112222,
      amount: 10,
    },
    {
      username: "Ben",
      contact: 44445555,
      amount: 20,
    },
  ];
  console.log(dummyData);
  const [sortDirection, setSortDirection] = useState(true); //True implies descending order
  const handleSortDirection = () => {
    setSortDirection(!sortDirection);
    // sortCategoryHandler();
  };

  return (
    <React.Fragment style={{ overflow: "auto" }}>
      <Row className="align-items-center pb-3">
        <Col xs="auto">
          <h2 className={styles.header}>Group Members</h2>{" "}
        </Col>
        <Col xs="auto">
          <Button variant="warning"> Reset Payments </Button>
        </Col>
        <Col xs="auto">
          <Form.Text>Sort by Amount</Form.Text>
        </Col>
        <Col xs="auto">
          <Button className={styles.btn} onClick={handleSortDirection}>
            {sortDirection && <ArrowUpwardIcon />}
            {!sortDirection && <ArrowDownwardIcon />}
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile</th>
            <th>Amount Owed($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((entry) => {
            return (
              <tr>
                <td className="py-3">{entry.username}</td>
                <td className="py-3">{entry.contact}</td>
                <td className="py-3">{entry.amount}</td>
                <td>
                  <Button variant="danger"> Remove</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </React.Fragment>
  );
}

export default GroupMemberList;
