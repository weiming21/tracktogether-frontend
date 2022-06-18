import Navigator from "../../components/navbar/Navigator";
import SideNavigator from "../../components/sidebar/SideNavigator";
import AuthContext from "../../store/AuthContext";
import imageAvatar from "../../images/img_avatar.png";
import Box from "../../components/Box";
import styles from "./Profile.module.css";
import React, { useState, useContext, useRef } from "react";
import { Form, Row, Col, Button, Image, Stack } from "react-bootstrap";
import EditIcon from "@mui/icons-material/Edit";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useNavigate } from "react-router-dom";

function Profile() {
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  const [username, setUserName] = useState(authCtx.username);
  const [contact, setContact] = useState(authCtx.contact);
  const [email, setEmail] = useState(authCtx.email);
  // const [image, setImage] = useState(authCtx.image);

  // const [imageName, setImageName] = useState(null);
  const inputRef = useRef(null);

  const [nameState, setNameState] = useState(true);
  const handleNameClick = (event) => {
    event.preventDefault();
    setNameState(!nameState);
  };

  const [contactState, setContactState] = useState(true);
  const handleContactClick = (event) => {
    event.preventDefault();
    setContactState(!contactState);
  };

  const [emailState, setEmailState] = useState(true);
  const handleEmailClick = (event) => {
    event.preventDefault();
    setEmailState(!emailState);
  };

  function handleSubmit(event) {
    event.preventDefault();
    const url = "http://localhost:8080/api/account/";
    fetch(url, {
      method: "PUT",
      body: JSON.stringify({
        _id: authCtx.id,
        username: username,
        email: email,
        contact: contact,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + authCtx.token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
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
        // console.log(data.data.account);
        // authCtx.login(data.data.token);
        authCtx.datalog(data.data.account);
        // console.log('working');
        navigation("/home");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  const handleUpload = (event) => {
    event.preventDefault();
    // setImage(URL.createObjectURL(inputRef.current.files[0]));
    const imageData = new FormData();
    imageData.append("id", authCtx.id);
    imageData.append("image", event.target.files[0]);
    console.log(imageData);
    fetch("http://localhost:8080/api/account/upload", {
      method: "PUT",
      body: imageData,
      headers: {
        authorization: "Bearer " + authCtx.token,
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
        console.log(data.data.account);
        location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const handleRemove = (event) => {
    event.preventDefault();
    fetch("http://localhost:8080/api/account/remove", {
      method: "DELETE",
      headers: {
        authorization: "Bearer " + authCtx.token,
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
        console.log(data.data.account);
        location.reload();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className={styles.newApp}>
      <Navigator />
      <div style={{ display: "flex", height: "100%", overflow: "auto" }}>
        <div className={styles.left}>
          <SideNavigator />
        </div>

        <div className={styles.right}>
          <Box>
            <h2 className={styles.header + " pb-3"}>Your Profile</h2>
            <div>
              <Image
                className="m-3"
                src={authCtx.image ? authCtx.image : imageAvatar}
                roundedCircle
                width="250"
                height="250"
              />{" "}
              <div className="m-3 d-flex align-items-center">
                <input
                  ref={inputRef}
                  onChange={handleUpload}
                  className="d-none"
                  type="file"
                  accept="image/*"
                />
                <div style={{ paddingLeft: 30 }}>
                  <Button
                    onClick={() => {
                      inputRef.current?.click();
                    }}>
                    Upload
                  </Button>
                </div>
                <div style={{ paddingLeft: 30 }}>
                  <Button variant="danger" onClick={handleRemove}>
                    Remove
                  </Button>
                </div>
              </div>
            </div>
            <Form>
              <Row className="mb-3">
                <Col xs={5}>
                  <Form.Group controlId="profileName">
                    <Form.Label className="text-start">Name</Form.Label>
                    <Form.Control
                      disabled={nameState}
                      placeholder="Enter Name"
                      value={authCtx.username}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col xs={1}>
                  <EditIcon onClick={handleNameClick} />
                </Col>

                <Col>
                  <Form.Group controlId="profileBank">
                    <Form.Label className="text-start"> Bank</Form.Label>
                    <Form.Control disabled placeholder="Bank Name" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <Form.Group controlId="profileName">
                    <Form.Label className="text-start">
                      Contact Number
                    </Form.Label>
                    <Form.Control
                      disabled={contactState}
                      placeholder="Enter Contact"
                      value={authCtx.contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col xs={1}>
                  <EditIcon onClick={handleContactClick} />
                </Col>

                <Col>
                  <Form.Group controlId="profileAccNumber">
                    <Form.Label className="text-start">
                      Account Number
                    </Form.Label>
                    <Form.Control disabled placeholder="Acc Num" />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col xs={5}>
                  <Form.Group controlId="profileEmail">
                    <Form.Label className="text-start">Email</Form.Label>
                    <Form.Control
                      disabled={emailState}
                      placeholder="Enter Email"
                      value={authCtx.email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col xs={1}>
                  <EditIcon onClick={handleEmailClick} />
                </Col>
              </Row>

              <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
            <Stack direction="horizontal" gap={3}>
              <Button className="mt-3"> Change Password</Button>
              <Button variant="danger" className="mt-3">
                Delete Account{" "}
              </Button>
            </Stack>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default Profile;
