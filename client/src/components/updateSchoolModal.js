import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function UpdateSchoolModal(props) {
  //showState, handleClose, and handleShow will toggle the modal that pops up and closes when the update button is clicked
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //stateful variable that will update the form in the modal as the user types
  const [updateSchoolState, setupdateSchoolState] = useState({
    schoolPrincipal: "",
    schoolBudget: "",
  });

  //funtion that calls the stateful variable and puts the user input within the variable
  const handleUpdateSchoolChange = (event) => {
    const { id, value } = event.target;

    setupdateSchoolState({
      ...updateSchoolState,
      [id]: value,
    });
  };

  //PUT route that will update the school in the database that matches the id provided, the id is grabbed from the button on the card that is clicked
  const handleUpdateSchool = (event) => {
    event.preventDefault();
    console.log(updateSchoolState);
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
        //close the modal when the update button is clicked
        props.handleClose();
        //rerun the school data fetch to bring back up-to-date information after school update
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
