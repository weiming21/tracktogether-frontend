import React, { useContext, useEffect, useState } from "react";
import styles from "./GroupComponent.module.css";
import imageAvatar from "../../../images/img_avatar.png";
import AuthContext from "../../../store/AuthContext";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  //   Tabs,
  //   Tab,
  // Table,
  //   Stack,
  Button,
  Image,
  Form,
  Row,
  Col,
  Modal,
  //   ListGroup,
  //   CloseButton,
  //   Container,
  // Card,
  // Image,
  // Popover,
  // OverlayTrigger,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import GroupContext from "../../../store/GroupContext";

function GroupSettings() {
  const navigation = useNavigate();
  const initialToken = localStorage.getItem("token");
  const authCtx = useContext(AuthContext);
  const grpCtx = useContext(GroupContext);
  console.log(authCtx);
  const groupID = useParams().groupID;
  // console.log(id);

  const groupInformation = grpCtx.findGroupWithID(groupID);

  const [deleteShow, setDeleteShow] = useState(false);
  const [leaveShow, setLeaveShow] = useState(false);

  const [currGroupName, setCurrGroupName] = useState(groupInformation.name);

  const [showUpdatedMessage, setShowUpdatedMessage] = useState(false);

  useEffect(() => {
    console.log("groupCtx has changed!");

    const groupInformation = grpCtx.findGroupWithID(groupID);
    console.log(groupInformation);
    setCurrGroupName(groupInformation.name);
  }, [grpCtx]);

  // console.log(setCurrGroupName);

  function handleOpen(name) {
    return () => {
      name == "delete" ? setDeleteShow(true) : setLeaveShow(true);
    };
  }

  function handleClose(name) {
    return () => {
      name == "delete" ? setDeleteShow(false) : setLeaveShow(false);
    };
  }

  function handleChangeGroupDetails() {
    const url = "http://localhost:8080/api/group/";
    fetch(url, {
      method: "PUT",
      // body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + initialToken,
      },
      body: JSON.stringify({
        groupID: groupID,
        name: currGroupName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.json().data.message);
        }
      })
      .then((data) => {
        const newGroupData = data.data.group;
        const groupName = newGroupData.name;
        grpCtx.updateGroupWithID(groupID, groupName);
        setShowUpdatedMessage(true);
        console.log("Group name updated successfully");
      });
  }

  function handleDeleteGroup() {
    const url = "http://localhost:8080/api/group/delete-group";
    fetch(url, {
      method: "PUT",
      // body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + initialToken,
      },
      body: JSON.stringify({
        groupID: groupID,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.json().data.message);
        }
      })
      .then(() => {
        grpCtx.deleteGroupWithID(groupID);
        console.log("Group deleted successfully");
      });
    navigation(-1);
  }

  function handleLeaveGroup() {
    const url = "http://localhost:8080/api/group/delete-member";
    fetch(url, {
      method: "PUT",
      // body: JSON.stringify(base),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + initialToken,
      },
      body: JSON.stringify({
        groupID: groupID,
        username: authCtx.username,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          console.log(res.json().data.message);
        }
      })
      .then(() => {
        grpCtx.deleteGroupWithID(groupID);
        console.log("Successfully left the group");
      });
    navigation(-1);
  }

  // const [groupName, setGroupName] = useState(props.name);

  // console.log(setGroupName);

  // function handleEdit(e) {
  //   e.preventDefault();
  // }

  return (
    <div className={styles.newApp}>
      <Row>
        <Col xs="auto">
          <h2 className={styles.header + " mb-0"}>Group Settings</h2>{" "}
        </Col>
      </Row>

      <Image
        className="m-3"
        src={imageAvatar}
        roundedCircle
        width="250"
        height="250"
      />
      <CameraAltIcon />
      <Row className="my-4">
        <Col xs="auto">
          <h5 className={styles.header}>Name</h5>
        </Col>
        <Col xs="auto">
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  value={currGroupName}
                  // placeholder={groupName}
                  onChange={(e) => setCurrGroupName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button onClick={handleChangeGroupDetails}> Save Changes</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {showUpdatedMessage && (
        <strong>
          {" "}
          <p style={{ color: "green" }}> Group Updated Successfully!</p>{" "}
        </strong>
      )}
      <Row>
        {/* <Col xs="auto"></Col> */}
        <Col xs="auto">
          <Button variant="danger" onClick={handleOpen("delete")}>
            {" "}
            Delete Group{" "}
          </Button>
          <Modal show={deleteShow} onHide={handleClose("delete")}>
            <Modal.Body>
              <strong>Are you sure you want to delete the group?</strong>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose("delete")}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDeleteGroup}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
        <Col xs="auto">
          <Button variant="danger" onClick={handleOpen("leave")}>
            {" "}
            Leave Group{" "}
          </Button>
          <Modal show={leaveShow} onHide={handleClose("leave")}>
            <Modal.Body>
              <strong>Are you sure you want to leave the group?</strong>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose("leave")}>
                Close
              </Button>
              <Button variant="danger" onClick={handleLeaveGroup}>
                Leave
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}

export default GroupSettings;
