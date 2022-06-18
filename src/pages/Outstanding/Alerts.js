import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Table } from "react-bootstrap";
// import Box from "../../components/Box";
import PaidIcon from "@mui/icons-material/Paid";
import FilterContext from "../../store/FilterContext";
import styles from "./Outstanding.module.css";

export default function Alerts() {
  const filterCtx = useContext(FilterContext);

  const [alert, setAlert] = useState(filterCtx.alertData);

  useEffect(() => {
    setAlert(filterCtx.alertData);
  }, [filterCtx]);

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
            <th>Payment to</th>
            <th>Contact</th>
            <th>Amount($)</th>
            <th>Confirm</th>
          </tr>
        </thead>
        <tbody>
          {alert
            .filter((entry) => entry.amount > 0)
            .map((entry, idx) => {
              return (
                <tr>
                  <td>{entry.group}</td>
                  <td>{entry.user}</td>
                  <td>{entry.contact}</td>
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
      {alert.length == 0 && (
        <p className={"p-5 " + styles.noGroupMessage}>
          You have no oustanding payments at the moment
        </p>
      )}
    </>
  );
}
