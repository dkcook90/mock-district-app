import React, { useState, useEffect } from "react";
import { Container, Row } from 'react-bootstrap'
import Auth from "../utils/auth";
import Nav from "../components/navbar";
import SchoolCard from "../components/schoolCard";

function Dashboard() {

  const user = Auth.getProfile()

  const [ schoolData, setschoolData ] = useState()
  
  
  const schoolDataFetch = () => {
    fetch ('/api/schools', {
      method: 'GET',
    }).then((res) => {
      return res.json()
    }).then((data) => {
      setschoolData(data)
    })
  }
  
  useEffect(() => {
    schoolDataFetch()
  }, [])

  return (
    <>
      <Nav user={user} />
      <Container>
        <Row>
        {schoolData ? schoolData.map((school) => {
          console.log(school)
          return <SchoolCard id={school.id} key={school.id} schoolData={school} schoolDataFetch={schoolDataFetch} />
        }) : <></>}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
