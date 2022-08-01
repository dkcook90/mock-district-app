import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddSchoolModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [addSchoolState, setaddSchoolState] = useState({
    schoolName: "",
    schoolAddress: "",
    schoolPrincipal: "",
    schoolBudget: "",
  });

  const handleAddSchoolChange = (event) => {
    const { id, value } = event.target;

    setaddSchoolState({
      ...addSchoolState,
      [id]: value,
    });
  };

  const handleAddSchool = (event) => {
    event.preventDefault();
    console.log(addSchoolState)
    fetch("/api/schools", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: addSchoolState.schoolName,
        address: addSchoolState.schoolAddress,
        principal: addSchoolState.schoolPrincipal,
        budget: addSchoolState.schoolBudget,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        props.handleClose();
        props.schoolDataFetch();
      });
  };

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add A New School</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddSchool}>
          <Form.Group controlId="schoolName">
            <Form.Label>School Name</Form.Label>
            <Form.Control type="input" onChange={handleAddSchoolChange} />
          </Form.Group>
          <Form.Group controlId="schoolAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control type="input" onChange={handleAddSchoolChange} />
          </Form.Group>
          <Form.Group controlId="schoolPrincipal">
            <Form.Label>Principal</Form.Label>
            <Form.Control type="input" onChange={handleAddSchoolChange} />
          </Form.Group>
          <Form.Group controlId="schoolBudget">
            <Form.Label>Budget</Form.Label>
            <Form.Control type="input" onChange={handleAddSchoolChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add School
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddSchoolModal;
