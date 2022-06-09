import React from "react";
import { Row, Col, Table } from "react-bootstrap";
// import Box from "../../components/Box";
// import EditIcon from "@mui/icons-material/Edit";
import AcceptIcon from "@mui/icons-material/CheckCircle";

export default function GroupOutstanding(props) {
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
            <th>Member</th>
            <th>Amount($)</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((entry) => {
            return (
              <tr>
                <td>{new Date(entry.date).toDateString()}</td>
                <td>{entry.information}</td>
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
