import React from 'react'
import { Button, Card } from 'react-bootstrap';
import schoolImage from '../assets/images/schoolImage.jpg'

function SchoolCard(props) {

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
      </Card.Body>
    </Card>
  );
}

export default SchoolCard;