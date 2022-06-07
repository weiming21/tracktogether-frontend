//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import styles from "./Groups.module.css";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import imageAvatar from "../../images/img_avatar.png";
import AddGroupModal from "./AddGroupModal";
import {
  // Table,
  Stack,
  Button,
  Form,
  Row,
  Col,
  Card,
  Image,
  // Popover,
  // OverlayTrigger,
} from "react-bootstrap";

function Group() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(authCtx);
  const dummyGroups = [
    {
      groupName: "Group 1",
      groupID: 1234,
    },
    {
      groupName: "Group 2",
      groupID: 2468,
    },
    {
      groupName: "A really really long group name",
      groupID: 4201,
    },
    {
      groupName: "Group 4",
      groupID: 2882,
    },
  ];
  function truncateName(name) {
    if (name.length > 12) {
      return name.slice(0, 9) + "...";
    } else {
      return name;
    }
  }
  console.log(dummyGroups);

  const [addGroupForm, setAddGroupForm] = useState(false);

  const handleClose = () => setAddGroupForm(false);
  const handleAddGroupForm = () => setAddGroupForm(true);

  const formProps = {
    addGroupForm: addGroupForm,
    handleClose: handleClose,
  };

  return (
    <React.Fragment style={{ overflow: "auto" }}>
      <Navigator />
      <div style={{ display: "flex", minHeight: "100%", overflow: "auto" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <Row className="align-items-center pb-3">
              <Col xs="auto">
                <h2> Groups</h2>
              </Col>
            </Row>
            <Row className="align-items-center pb-3">
              <Col xs="4">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Col>
              <Col xs="auto">
                <Button>Join</Button>
              </Col>
              <Col xs="auto">
                <Button onClick={handleAddGroupForm}>Create</Button>
              </Col>
            </Row>
            <Row xs={1} sm={2} xl={4} xxl={6} className="g-4">
              {dummyGroups.map((entry) => {
                return (
                  <Col>
                    <Card
                      className={styles.groupCard + " m-5"}
                      onClick={() => {
                        navigate("./" + entry.groupID);
                      }}
                    >
                      <Card.Body>
                        <Stack>
                          <Image
                            src={imageAvatar}
                            roundedCircle
                            width="75"
                            height="75"
                            className={styles.groupImage + " mb-3"}
                          />

                          <h4> {truncateName(entry.groupName)}</h4>
                          <p className="mb-0"> {entry.groupID}</p>
                        </Stack>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Box>
        </div>
      </div>
      <AddGroupModal formProps={formProps} />
    </React.Fragment>
  );
}

export default Group;
