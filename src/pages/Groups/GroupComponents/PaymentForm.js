import React, { useState, useContext, useEffect } from "react";
import styles from "./GroupComponent.module.css";
import AuthContext from "../../../store/AuthContext";
import GroupContext from "../../../store/GroupContext";
import { useParams } from "react-router-dom";
import {
  //   Tabs,
  //   Tab,
  // Table,
  //   Stack,
  Button,
  Form,
  Row,
  Col,
  ListGroup,
  CloseButton,
  //   Container,
  // Card,
  // Image,
  // Popover,
  // OverlayTrigger,
} from "react-bootstrap";

function PaymentForm() {
  // const initialToken = localStorage.getItem("token");
  const authCtx = useContext(AuthContext);
  console.log(authCtx);
  const grpCtx = useContext(GroupContext);

  const groupID = useParams().groupID;

  const [groupInformation, setGroupInformation] = useState(
    grpCtx.findGroupWithID(groupID).users
  );

  useEffect(() => {
    const newGroupInformation = grpCtx.findGroupWithID(groupID).users;
    setGroupInformation(newGroupInformation);
  }, [grpCtx]);

  useEffect(() => {
    setInitiatingMember(authCtx.username);
  }, [authCtx]);

  const [localData, setLocalData] = useState([]);
  const [currDescription, setCurrDescription] = useState("");
  const [splitEvenly, setSplitEvenly] = useState(true);
  const [currAmount, setCurrAmount] = useState(0);
  const [currCategory, setCurrCategory] = useState("Food");
  const [initiatingMember, setInitiatingMember] = useState(authCtx.username);
  const [currMember, setCurrMember] = useState("All");

  /*
  function handleSubmitInitiatePayment() {

    let hasInitiatingMember = false;

    const processedInformation = localData.map(entry => {
      const json = {
        username: entry.username,
        amount: amount,
        description: currDescription,
        category: currCategory,
        status: false
      }
      if (entry.username === initiatingMember) {
        hasInitiatingMember = true;
        json.status = true;
        json.amount = json.amount - currAmount;
      } 
      return json;
    })

    if (!hasInitiatingMember) {
      processedInformation.push({
        username: initiatingMember,
        amount : -currAmount,
        description: currDescription,
        category: currCategory,
        status:true
      })
    }

    const url = "http://localhost:8080/api/group/initiatePayment";
    fetch(url, {
      method: "POST",
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
  }*/

  function handleCurrAmount(e) {
    setCurrAmount(e.target.value);
    const updatedLocalAmounts = resetIndivAmount(splitEvenly)(
      localData,
      e.target.value
    );
    setLocalData(updatedLocalAmounts);
  }

  function resetIndivAmount(splitEvenlyState) {
    return (newLocalData, newCurrAmount) => {
      if (splitEvenlyState) {
        const updatedLocalAmounts = newLocalData.map((user) => {
          const toReturn = {
            ...user,
          };
          toReturn.amount = Number(newCurrAmount / newLocalData.length).toFixed(
            2
          );
          return toReturn;
        });
        return updatedLocalAmounts;
      } else {
        return newLocalData;
      }
    };
  }

  function handleAddMembers() {
    if (currMember === "All") {
      const newLocalData = [...groupInformation];
      const updatedLocalAmounts = resetIndivAmount(splitEvenly)(
        newLocalData,
        currAmount
      );
      setLocalData(updatedLocalAmounts);
    } else {
      const newLocalData = [...localData];
      const entry = groupInformation.filter(
        (member) => member.username === currMember
      )[0];
      if (
        !localData.map((member) => member.username).includes(entry.username)
      ) {
        newLocalData.push(entry);
        const updatedLocalAmounts = resetIndivAmount(splitEvenly)(
          newLocalData,
          currAmount
        );
        setLocalData(updatedLocalAmounts);
      }
    }
  }

  function handleCustomAmount(index) {
    return (e) => {
      const newLocalData = [...localData];
      newLocalData[index].amount = e.target.value;
      setLocalData(newLocalData);
    };
  }

  function handleDelete(index) {
    return () => {
      const newLocalData = [...localData];
      newLocalData.splice(index, 1);
      const updatedLocalAmounts = resetIndivAmount(splitEvenly)(
        newLocalData,
        currAmount
      );
      setLocalData(updatedLocalAmounts);
    };
  }

  return (
    <>
      {/* <h2 className={styles.header}> This Group </h2> */}
      <Row xs={1} xl={2}>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="paymentFormDescription">
              <Form.Label>Description </Form.Label>
              <Form.Control
                value={currDescription}
                onChange={(e) => setCurrDescription(e.target.value)}
                placeholder="Enter Description"
              />
            </Form.Group>
            <Form.Group className="my-4" controlId="paymentFormSplit">
              <Form.Check
                type="switch"
                id="custom-switch"
                onClick={() => {
                  setSplitEvenly(!splitEvenly);
                  const updatedLocalAmounts = resetIndivAmount(!splitEvenly)(
                    localData,
                    currAmount
                  );
                  setLocalData(updatedLocalAmounts);
                }}
                label="Split Differently?"
              />
            </Form.Group>
            {splitEvenly && (
              <Form.Group className="mb-3" controlId="paymentFormAmount">
                <Form.Label>Amount </Form.Label>
                <Form.Control
                  value={currAmount}
                  onChange={handleCurrAmount}
                  type="Number"
                  placeholder="Enter Amount"
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="paymentFormCategory">
              <Form.Label>Category </Form.Label>
              <Form.Select
                value={currCategory}
                onChange={(e) => setCurrCategory(e.target.value)}
              >
                <option> Food </option>
                <option> Transport </option>
                <option> Bills </option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="initiatingMember">
              <Form.Label> Payment to </Form.Label>
              <Row className="align-items-right">
                <Col xs="auto">
                  <Form.Select
                    value={initiatingMember}
                    onChange={(e) => {
                      setInitiatingMember(e.target.value);
                    }}
                  >
                    {groupInformation.map((member) => {
                      return <option> {member.username} </option>;
                    })}
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>

            <Form.Group className="mb-3" controlId="paymentFormMembers">
              <Form.Label>Members </Form.Label>
              <Row className="align-items-right">
                <Col xs="auto">
                  <Form.Select
                    value={currMember}
                    onChange={(e) => {
                      setCurrMember(e.target.value);
                    }}
                  >
                    <option> All </option>
                    {groupInformation.map((member) => {
                      return <option> {member.username} </option>;
                    })}
                  </Form.Select>
                </Col>
                <Col xs="auto">
                  <Button onClick={handleAddMembers}> Add Members </Button>{" "}
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Col>
        <Col>
          <ListGroup>
            <ListGroup.Item className={styles.memberListTitle}>
              <Row>
                <Col xs={9} xl={7} xxl={9} className={styles.memberList}>
                  <p className="my-2"> Name</p>
                </Col>
                <Col xs={2} xl={3} xxl={2}>
                  <p className="my-2 ms-auto"> Amount </p>
                </Col>
                <Col xs={1} xl={2} xxl={1}>
                  <p className="my-2"> Action </p>
                </Col>
              </Row>
            </ListGroup.Item>
            {localData.map((entry, index) => {
              return (
                <ListGroup.Item>
                  <Row>
                    <Col xs={9} xl={7} xxl={9} className={styles.memberList}>
                      <p className={styles.tableLeftEntry}> {entry.username}</p>
                    </Col>
                    <Col xs={2} xl={3} xxl={2} className={styles.memberList}>
                      {splitEvenly && (
                        <p className={styles.tableCenterEntry + " ms-auto"}>
                          {entry.amount}
                        </p>
                      )}
                      {!splitEvenly && (
                        <Form.Control
                          type="number"
                          value={entry.amount}
                          onChange={handleCustomAmount(index)}
                        />
                      )}
                    </Col>
                    <Col xs={1} xl={2} xxl={1} className={styles.memberList}>
                      <CloseButton
                        className={styles.tableCenterEntry}
                        onClick={handleDelete(index)}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <Button style={{ display: "flex" }} className="my-3">
            {" "}
            Send Transaction Request{" "}
          </Button>{" "}
        </Col>
      </Row>
    </>
  );
}

export default PaymentForm;
