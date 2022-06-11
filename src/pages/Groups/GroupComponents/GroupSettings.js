import React, { useContext, useState } from "react";
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
import { useParams } from "react-router-dom";

function GroupSettings(props) {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const id = useParams();
  console.log(id);

  const [deleteShow, setDeleteShow] = useState(false);
  const [leaveShow, setLeaveShow] = useState(false);

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

  const [groupName, setGroupName] = useState(props.name);

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
                <Form.Control placeholder={groupName}></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Button> Save Changes</Button>
            </Col>
          </Row>
        </Col>
      </Row>
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
              <Button variant="danger">Delete</Button>
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
              <Button variant="danger">Leave</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </div>
  );
}

export default GroupSettings;
