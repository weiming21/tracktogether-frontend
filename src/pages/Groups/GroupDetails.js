//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import PaymentForm from "./GroupComponents/PaymentForm";
import GroupMemberList from "./GroupComponents/GroupMemberList";
import GroupSettings from "./GroupComponents/GroupSettings";
import styles from "./Groups.module.css";
import React, { useContext } from "react";
import AuthContext from "../../store/AuthContext";
import GroupContext from "../../store/GroupContext";
import { useParams } from "react-router-dom";
import {
  Tabs,
  Tab,
  // Table,
  // Stack,
  // Button,
  // Form,
  // Row,
  // Col,
  // Card,
  // Image,
  // Popover,
  // OverlayTrigger,
} from "react-bootstrap";

function GroupDetails() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const grpCtx = useContext(GroupContext);
  //Use this to find the specific route of the group
  const params = useParams();

  return grpCtx.validateGroupWithID(parseInt(params.groupID)) ? (
    <React.Fragment style={{ overflow: "auto" }}>
      <Navigator />
      <div style={{ display: "flex", minHeight: "100%", overflow: "auto" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <Tabs
              defaultActiveKey="payment"
              id="uncontrolled-tab-example"
              className="mb-3">
              <Tab eventKey="payment" title="Initiate Payment">
                <PaymentForm />
              </Tab>
              <Tab eventKey="memberList" title="Member List">
                <GroupMemberList />
              </Tab>
              <Tab eventKey="groupSettings" title="Group Settings">
                <GroupSettings />
              </Tab>
            </Tabs>
          </Box>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <div>
      <h1>Error 404 not found</h1>
    </div>
  );
}

export default GroupDetails;
