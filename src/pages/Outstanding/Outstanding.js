import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import React from "react";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/AuthContext";
import PersonalOutstanding from "./PersonalOutstanding";
import GroupOutstanding from "./GroupOutstanding";
import Alerts from "./Alerts";
import MonitorPayments from "./MonitorPayments";
import AdjustmentLogs from "./AdjustmentLogs";
import styles from "./Outstanding.module.css";
import {
  // Row,
  // Col,
  // Table,
  Tabs,
  Tab,
} from "react-bootstrap";
import Box from "../../components/Box";
// import EditIcon from "@mui/icons-material/Edit";
// import AcceptIcon from "@mui/icons-material/CheckCircle";
// import RejectIcon from "@mui/icons-material/Cancel";
// import PaidIcon from "@mui/icons-material/Paid";

function Outstanding() {
  const authCtx = useContext(AuthContext);
  const [localData, setLocalData] = useState([]);

  useEffect(() => {
    console.log(authCtx.isFetchingData + " use effect frames");
    if (authCtx.isDataFetched) {
      const url = "http://localhost:8080/api/account/" + authCtx.id;
      console.log("fetching data in outstanding " + url);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setLocalData(data);
        })
        .catch((error) => console.log(error));
    }
  }, [authCtx]);

  //   return (
  //     <React.Fragment style={{ overflow: "auto" }}>
  //       <Navigator />
  //       <div style={{ display: "flex", height: "100%", overflow: "auto" }}>
  //         <div>
  //           <SideNavigator />
  //         </div>

  //         <div style={{ flexGrow: 1 }}>
  //           <Row>
  //             <Col>
  //               <Box>
  //                 <Row className="align-items-center pb-3">
  //                   <Col xs="auto">
  //                     {" "}
  //                     <h2 style={{ color: "blue" }}>Personal Trasactions</h2>
  //                   </Col>
  //                   <Col xs="auto"> </Col>
  //                 </Row>
  //                 <Table striped bordered hover>
  //                   <thead>
  //                     <tr>
  //                       <th>Date</th>
  //                       <th>Transaction Name</th>
  //                       <th>Amount($)</th>
  //                       <th>Category</th>
  //                       <th colSpan={3}>Actions</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {localData.map((entry) => {
  //                       return (
  //                         <tr>
  //                           <td>{new Date(entry.date).toDateString()}</td>
  //                           <td>{entry.information}</td>
  //                           <td>{Number(entry.amount).toFixed(2)}</td>
  //                           <td>{entry.category}</td>
  //                           <td>
  //                             <AcceptIcon style={{ color: "green" }} />
  //                           </td>

  //                           <td>
  //                             <RejectIcon style={{ color: "red" }} />
  //                           </td>
  //                           <td>
  //                             <EditIcon />
  //                           </td>
  //                         </tr>
  //                       );
  //                     })}
  //                   </tbody>
  //                 </Table>
  //               </Box>
  //             </Col>
  //             <Col>
  //               <Box>
  //                 <Row className="align-items-center pb-3">
  //                   <Col xs="auto">
  //                     {" "}
  //                     <h2 style={{ color: "blue" }}>Outstanding Payments</h2>
  //                   </Col>
  //                   <Col xs="auto"> </Col>
  //                 </Row>
  //                 <Table striped bordered hover>
  //                   <thead>
  //                     <tr>
  //                       <th>Group</th>
  //                       <th>Member</th>
  //                       <th>Amount($)</th>
  //                       <th>Confirm</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {localData.map((entry) => {
  //                       return (
  //                         <tr>
  //                           <td>{new Date(entry.date).toDateString()}</td>
  //                           <td>{entry.information}</td>
  //                           <td>{Number(entry.amount).toFixed(2)}</td>
  //                           <td>
  //                             <AcceptIcon style={{ color: "green" }} />
  //                           </td>
  //                         </tr>
  //                       );
  //                     })}
  //                   </tbody>
  //                 </Table>
  //               </Box>
  //               <Box>
  //                 <Row className="align-items-center pb-3">
  //                   <Col xs="auto">
  //                     {" "}
  //                     <h2 style={{ color: "red" }}>Alerts</h2>
  //                   </Col>
  //                   <Col xs="auto"> </Col>
  //                 </Row>
  //                 <Table striped bordered hover>
  //                   <thead>
  //                     <tr>
  //                       <th>Group</th>
  //                       <th>Member</th>
  //                       <th>Amount($)</th>
  //                       <th>Confirm</th>
  //                     </tr>
  //                   </thead>
  //                   <tbody>
  //                     {localData.map((entry) => {
  //                       return (
  //                         <tr>
  //                           <td>{new Date(entry.date).toDateString()}</td>
  //                           <td>{entry.information}</td>
  //                           <td>{Number(entry.amount).toFixed(2)}</td>
  //                           <td>
  //                             <PaidIcon style={{ color: "green" }} />
  //                           </td>
  //                         </tr>
  //                       );
  //                     })}
  //                   </tbody>
  //                 </Table>
  //               </Box>
  //             </Col>
  //           </Row>
  //         </div>
  //       </div>
  //     </React.Fragment>
  //   );
  return (
    <React.Fragment style={{ overflow: "auto" }}>
      <Navigator />
      <div style={{ display: "flex", minHeight: "100%", overflow: "auto" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <Tabs
              defaultActiveKey="Personal"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="Personal" title="Personal">
                <PersonalOutstanding data={localData} />
              </Tab>
              <Tab eventKey="Group" title="Group">
                <GroupOutstanding data={localData} />
              </Tab>
              <Tab eventKey="Alerts" title="Payments Due">
                <Alerts data={localData} />
              </Tab>
              <Tab eventKey="Monitor" title="Monitor Payments">
                <MonitorPayments data={localData} />
              </Tab>
              <Tab eventKey="AdjustmentLogs" title="Adjustment Logs">
                <AdjustmentLogs data={localData} />
              </Tab>
            </Tabs>
          </Box>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Outstanding;
