import React, { useState, useContext, useEffect } from "react";
import styles from "./GroupComponent.module.css";
import AuthContext from "../../../store/AuthContext";
import GroupContext from "../../../store/GroupContext";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useParams } from "react-router-dom";
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
  // const initialToken = localStorage.getItem("token");
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const grpCtx = useContext(GroupContext);

  const groupID = useParams().groupID;

  const [groupInformation, setGroupInformation] = useState(
    grpCtx.findGroupWithID(groupID).users
  );

  useEffect(() => {
    const newGroupInformation = grpCtx.findGroupWithID(groupID).users;
    setGroupInformation(newGroupInformation);
  }, [grpCtx]);

  const [sortDirection, setSortDirection] = useState(true); //True implies descending order
  const handleSortDirection = () => {
    setSortDirection(!sortDirection);
    // sortCategoryHandler();
  };

  const handleResetPayments = () => {
    const url = "http://localhost:8080/api/group/reset-payment";
    fetch(url, {
      method: "POST",
      // body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
        // authorization: "Bearer " + initialToken,
      },
      body: JSON.stringify({
        groupID: groupID,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.json().data.message);
        }
      })
      .then((data) => {
        const newGroupData = data.data.group;
        grpCtx.updateGroupInformation(groupID, newGroupData);
        console.log("Successfully initiated payment");
      });
  };

  return (
    <React.Fragment style={{ overflow: "auto" }}>
      <Row className="align-items-center pb-3">
        <Col xs="auto">
          <h2 className={styles.header}>Group Members</h2>{" "}
        </Col>
        <Col xs="auto">
          <Button variant="warning" onClick={handleResetPayments}>
            {" "}
            Reset Payments{" "}
          </Button>
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
          {groupInformation.map((entry) => {
            return (
              <tr>
                <td className="py-3">{entry.username}</td>
                <td className="py-3">{entry.contact}</td>
                <td className="py-3">{Number(entry.amount).toFixed(2)}</td>
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
