import React, { useState } from 'react'
import { Button, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import schoolImage from '../assets/images/schoolImage.jpg';
import UpdateModal from '../components/updateSchoolModal';

function SchoolCard(props) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const handleDeleteSchool = (event) => {
        fetch ('/api/schools/deleteSchool', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.id
            })
          }).then(() => {
            props.schoolDataFetch()
          })
    }

  return (
    <>
    <Card className="m-2" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={schoolImage} />
      <Card.Body>
        <Card.Title>{props.schoolData.name}</Card.Title>
        <Card.Subtitle>{props.schoolData.address}</Card.Subtitle>
          <ListGroup className="m-1" variant="flush">
            <ListGroup.Item>Principal: {props.schoolData.principal}</ListGroup.Item>
            <ListGroup.Item>Budget: {props.schoolData.budget}</ListGroup.Item>
          </ListGroup>
        <Button className="btn-sm m-1" id={props.schoolData.id} variant="warning" onClick={handleShow}>Update</Button>
        <Button className="btn-sm m-1" id={props.schoolData.id} variant="danger" onClick={handleDeleteSchool}>DELETE SCHOOL</Button>
      </Card.Body>
    </Card>
    <UpdateModal show={show} handleShow={handleShow} handleClose={handleClose} schoolDataFetch={props.schoolDataFetch} schoolData={props.schoolData} />
    </>
  );
}

export default SchoolCard;