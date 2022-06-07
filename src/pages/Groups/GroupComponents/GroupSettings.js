import React, { useContext } from "react";
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
  //   ListGroup,
  //   CloseButton,
  //   Container,
  // Card,
  // Image,
  // Popover,
  // OverlayTrigger,
} from "react-bootstrap";

function GroupSettings() {
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const dummyData = [
    {
      username: "John",
      amount: 10,
    },
    {
      username: "Ben",
      amount: 20,
    },
  ];
  console.log(dummyData);

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
          <h5 className={styles.header}> Edit Name </h5>
        </Col>
        <Col xs="auto">
          <Form.Group>
            <Form.Control></Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs="auto">
          <Button> Save Changes</Button>
        </Col>
        <Col xs="auto">
          <Button variant="danger"> Delete Group </Button>
        </Col>
      </Row>
    </div>
  );
}

export default GroupSettings;
