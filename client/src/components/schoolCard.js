import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
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
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={schoolImage} />
      <Card.Body>
        <Card.Title>{props.schoolData.name}</Card.Title>
          <ul>
            <li>{props.schoolData.address}</li>
            <li>{props.schoolData.principal}</li>
            <li>{props.schoolData.budget}</li>
          </ul>
        <Button id={props.schoolData.id} variant="danger" onClick={handleDeleteSchool}>DELETE SCHOOL</Button>
        <Button id={props.schoolData.id} variant="warning" onClick={handleShow}>Update</Button>
      </Card.Body>
    </Card>
    <UpdateModal show={show} handleShow={handleShow} handleClose={handleClose} schoolDataFetch={props.schoolDataFetch} schoolData={props.schoolData} />
    </>
  );
}

export default SchoolCard;