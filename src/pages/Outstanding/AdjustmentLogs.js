import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Table } from "react-bootstrap";
// import Box from "../../components/Box";
import FilterContext from "../../store/FilterContext";

export default function MonitorPayments() {
  const filterCtx = useContext(FilterContext);

  const [currAdjustmentData, setCurrAdjustmentData] = useState(
    filterCtx.adjustmentData
  );

  useEffect(() => {
    setCurrAdjustmentData(filterCtx.adjustmentData);
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
          <h2>Adjustment Logs</h2>
        </Col>
        <Col xs="auto"> </Col>
      </Row>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> Date</th>
            <th>Transaction Name</th>
            <th>Category</th>

            <th>Amount($)</th>
            <th>Group</th>
          </tr>
        </thead>
        <tbody>
          {currAdjustmentData.map((entry) => {
            return (
              <tr>
                <td>{new Date(entry.date).toDateString()}</td>
                <td>
                  {entry.description === ""
                    ? "No information logged"
                    : entry.information}
                </td>
                <td>{entry.category}</td>
                <td>{Number(entry.amount).toFixed(2)}</td>
                <td>{entry.groupID}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
