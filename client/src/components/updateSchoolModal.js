import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateSchoolModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [updateSchoolState, setupdateSchoolState] = useState({
    schoolPrincipal: "",
    schoolBudget: "",
  });

  const handleUpdateSchoolChange = (event) => {
    const { id, value } = event.target;

    setupdateSchoolState({
      ...updateSchoolState,
      [id]: value,
    });
  };

  const handleUpdateSchool = (event) => {
    event.preventDefault();
    console.log(updateSchoolState)
    fetch("/api/schools/updateSchool", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.schoolData.id,
        principal: updateSchoolState.schoolPrincipal,
        budget: updateSchoolState.schoolBudget,
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
        <Modal.Title>Update {props.schoolData.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleUpdateSchool}>
          <Form.Group controlId="schoolPrincipal">
            <Form.Label>Principal</Form.Label>
            <Form.Control type="input" onChange={handleUpdateSchoolChange} />
          </Form.Group>
          <Form.Group controlId="schoolBudget">
            <Form.Label>Budget</Form.Label>
            <Form.Control type="input" onChange={handleUpdateSchoolChange} />
          </Form.Group>
          <Button className="m-1" variant="warning" type="submit">
            Update
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateSchoolModal;