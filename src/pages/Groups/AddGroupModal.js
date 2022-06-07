import React from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AddGroupModal(props) {
  const formProps = props.formProps;
  return (
    <Modal show={formProps.addGroupForm} onHide={formProps.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create New Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="formBasicname">
          <Form.Label>Group Name</Form.Label>
          <Form.Control placeholder="Enter Name" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button>Create group</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddGroupModal;
