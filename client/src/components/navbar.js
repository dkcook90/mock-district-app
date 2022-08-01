import React, { useState }from "react";
import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import Auth from '../utils/auth';
import AddModal from '../components/addSchoolModal';

function Navigation(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   return( 
    <>
   <Nav>
      <Nav.Item>
        Welcome {props.user.name}
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={handleShow}>Add School</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-2">Link</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="disabled" disabled>
          Disabled
        </Nav.Link>
      </Nav.Item>
      <Button variant="primary" onClick={Auth.logout}>Logout</Button>
    </Nav>
    <AddModal show={show} handleShow={handleShow} handleClose={handleClose} schoolDataFetch={props.schoolDataFetch}/>
    </>
   )
}

export default Navigation;
