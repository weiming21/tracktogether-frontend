import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Table } from "react-bootstrap";
// import Box from "../../components/Box";
import FilterContext from "../../store/FilterContext";
import styles from "./Outstanding.module.css";
export default function MonitorPayments() {
  const filterCtx = useContext(FilterContext);

  const [alert, setAlert] = useState(filterCtx.alertData);

  useEffect(() => {
    setAlert(filterCtx.alertData);
  }, [filterCtx]);

  //   function handleAlert(index) {
  //     return () => {
  //       const newAlert = [...alert];
  //       newAlert.splice(index, 1);
  //       setAlert(newAlert);
  //     };
  //   }

  return (
    <>
      <Row className="align-items-center pb-3">
        <Col xs="auto">
          {" "}
          <h2>Payments Due</h2>
        </Col>
        <Col xs="auto"> </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Group</th>
            <th>Payment from</th>
            <th>Contact</th>
            <th>Amount($)</th>
          </tr>
        </thead>
        <tbody>
          {alert
            .filter((entry) => entry.amount < 0)
            .map((entry) => {
              return (
                <tr>
                  <td>{entry.group}</td>
                  <td>{entry.user}</td>
                  <td>{entry.contact}</td>
                  <td>{Number(-entry.amount).toFixed(2)}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {alert.length == 0 && (
        <p className={"p-5 " + styles.noGroupMessage}>
          You have no one that owe you money at the moment
        </p>
      )}
    </>
  );
}
