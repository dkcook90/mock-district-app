import React, { useState } from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import AddModal from "../components/addSchoolModal";

function Navigation(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="m-1">
          <h3>Welcome {props.user.name}</h3>
        </Navbar.Brand>
        <Nav className="">
          <Nav.Item>
            <Button
              className="btn-success btn-sm mt-1"
              type="button"
              onClick={handleShow}
            >
              Add School
            </Button>
          </Nav.Item>
          <Button className="btn-primary btn-sm m-1" onClick={Auth.logout}>
            Logout
          </Button>
        </Nav>
      </Navbar>
      <AddModal
        show={show}
        handleShow={handleShow}
        handleClose={handleClose}
        schoolDataFetch={props.schoolDataFetch}
      />
    </>
  );
}

export default Navigation;
