import React, { useContext } from "react";
// import styles from "./PaymentForm.module.css";
import imageAvatar from "../../../images/img_avatar.png";
import AuthContext from "../../../store/AuthContext";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import {
  //   Tabs,
  //   Tab,
  // Table,
  //   Stack,
  Image,
  //   Form,
  //   Row,
  //   Col,
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
    <>
      <Image
        className="m-3"
        src={imageAvatar}
        roundedCircle
        width="250"
        height="250"
      />
      <CameraAltIcon />
    </>
  );
}

export default GroupSettings;
