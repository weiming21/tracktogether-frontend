import React, { useContext } from "react";
// import styles from "./PaymentForm.module.css";
import AuthContext from "../../../store/AuthContext";
import {
  //   Tabs,
  //   Tab,
  // Table,
  //   Stack,
  Button,
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

function GroupMemberList() {
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

  return <Button> Here</Button>;
}

export default GroupMemberList;
