import React, { useEffect, useState } from "react";
import { Row, Col, Table } from "react-bootstrap";
// import Box from "../../components/Box";
import PaidIcon from "@mui/icons-material/Paid";

export default function Alerts(props) {
  const [alert, setAlert] = useState([]);

  useEffect(() => {
    setAlert(props.data);
    console.log(props.data);
  }, [props.data]);

  function handleAlert(index) {
    return () => {
      const newAlert = [...alert];
      newAlert.splice(index, 1);
      setAlert(newAlert);
    };
  }

  return (
    <>
      <Row className="align-items-center pb-3">
        <Col xs="auto">
          {" "}
          <h2>Alerts</h2>
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
          {alert.map((entry, idx) => {
            return (
              <tr>
                <td>{new Date(entry.date).toDateString()}</td>
                <td>{entry.information}</td>
                <td>{Number(entry.amount).toFixed(2)}</td>
                <td>
                  <PaidIcon
                    style={{ color: "green" }}
                    onClick={handleAlert(idx)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
