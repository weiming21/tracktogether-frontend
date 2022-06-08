//import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import Box from "../../components/Box";
import styles from "./Groups.module.css";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import GroupContext from "../../store/GroupContext";
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
  const groupCtx = useContext(GroupContext);
  const navigate = useNavigate();

  console.log(authCtx);
  console.log(groupCtx);

  const [groups, setGroups] = useState([]);
  const [groupToJoin, setGroupToJoin] = useState();

  function childToParent(childdata) {
    const newGroups = groups;
    newGroups.push(childdata);
    setGroups(newGroups);
    groupCtx.datalog(newGroups);
  }

  function handleJoin(e) {
    e.preventDefault();
    if (groupToJoin) {
      fetch("http://localhost:8080/api/group/join", {
        method: "PUT",
        body: JSON.stringify({
          groupID: groupToJoin,
          username: authCtx.username,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage;
              console.log(JSON.stringify(data));
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }
              console.log(errorMessage);
              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const newGroups = groups;
          newGroups.push(data.data.group);
          console.log(newGroups);
          setGroups(newGroups);
          groupCtx.datalog(newGroups);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }

  console.log("loading groups:" + groupCtx.group);
  useEffect(() => {
    // console.log(groups);
    // console.log(groupCtx.group);
    setGroups(groupCtx.group);
  }, [groupCtx]);

  function truncateName(name) {
    if (name.length > 12) {
      return name.slice(0, 9) + "...";
    } else {
      return name;
    }
  }
  // console.log(dummyGroups);

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
                  onChange={(e) => setGroupToJoin(e.target.value)}
                />
              </Col>
              <Col xs="auto">
                <Button onClick={handleJoin}>Join</Button>
              </Col>
              <Col xs="auto">
                <Button onClick={handleAddGroupForm}>Create</Button>
              </Col>
            </Row>
            <Row xs={1} sm={2} xl={4} xxl={6} className="g-4">
              {groups.map((entry) => {
                return (
                  <Col>
                    <Card
                      className={styles.groupCard + " m-5"}
                      onClick={() => {
                        navigate("./" + entry.groupID);
                      }}>
                      <Card.Body>
                        <Stack>
                          <Image
                            src={imageAvatar}
                            roundedCircle
                            width="75"
                            height="75"
                            className={styles.groupImage + " mb-3"}
                          />

                          <h4> {truncateName(entry.name)}</h4>
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
      <AddGroupModal formProps={formProps} childToParent={childToParent} />
    </React.Fragment>
  );
}

export default Group;
