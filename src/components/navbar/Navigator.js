import React from 'react';
import logo from '../../images/logo.png';
import {
  Nav,
  Navbar,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';

function Navigator() {
  const navbar = { backgroundColor: '#64B5F6' };
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      TrackTogether
    </Tooltip>
  );
  return (
    <Navbar style={navbar} variant="light" expand="lg">
      <Container fluid>
        <OverlayTrigger
          placement="right"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}>
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="50"
              height="50"
              className="d-inline-block align-top"
              alt="TrackTogether"
            />
          </Navbar.Brand>
        </OverlayTrigger>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>

        <Nav
          className="me-auto my-2 my-lg-0"
          style={{ maxHeight: '100px' }}
          navbarScroll>
          <NavDropdown
            align="end"
            title="Settings"
            id="navbarScrollingDropdown">
            <NavDropdown.Item href="/">Change Password</NavDropdown.Item>
            <NavDropdown.Item href="/">Sync to Bank Account</NavDropdown.Item>
            <NavDropdown.Item href="/">Another Action</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/">Delete account</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigator;
