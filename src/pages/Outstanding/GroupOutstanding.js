import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Table } from "react-bootstrap";
// import Box from "../../components/Box";
// import EditIcon from "@mui/icons-material/Edit";
import AcceptIcon from "@mui/icons-material/CheckCircle";
import AuthContext from "../../store/AuthContext";
import GroupContext from "../../store/GroupContext";

export default function GroupOutstanding() {
  // const initialToken = localStorage.getItem("token");
  const authCtx = useContext(AuthContext);
  const grpCtx = useContext(GroupContext);
  const notifications = grpCtx.findNotifications(authCtx.username);
  const [currNotifications, setCurrNotifications] = useState(notifications);

  useEffect(() => {
    const notifications = grpCtx.findNotifications(authCtx.username);
    setCurrNotifications(notifications);
  }, [grpCtx]);

  return (
    <>
      <Row className="align-items-center pb-3">
        <Col xs="auto">
          {" "}
          <h2>Outstanding Payments</h2>
        </Col>
        <Col xs="auto"> </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Group</th>
            <th>Member to pay</th>
            <th>Amount($)</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          {currNotifications.map((entry) => {
            return (
              <tr>
                <td>{entry.groupName}</td>
                <td>{entry.targetUsername}</td>
                <td>{Number(entry.amount).toFixed(2)}</td>
                <td>
                  <AcceptIcon style={{ color: "green" }} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
