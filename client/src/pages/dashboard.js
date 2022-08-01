import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Auth from "../utils/auth";
import Nav from "../components/navbar";
import SchoolCard from "../components/schoolCard";

function Dashboard() {
  //get information on the current user thats logged in
  const user = Auth.getProfile();

  //stateful variable that will hold our school data from the database after the fetch
  const [schoolData, setschoolData] = useState();

  //fetch the data from all the schools in the data base
  const schoolDataFetch = () => {
    fetch("/api/schools", {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setschoolData(data);
      });
  };

  //this useEffect will only allow the fetch to run once (or then the function schoolDataFetch() is called)
  useEffect(() => {
    schoolDataFetch();
  }, []);

  return (
    <>
      <Nav user={user} schoolDataFetch={schoolDataFetch} />
      <Container>
        <Row>
          {schoolData ? (
            schoolData.map((school) => {
              console.log(school);
              return (
                <SchoolCard
                  id={school.id}
                  key={school.id}
                  schoolData={school}
                  schoolDataFetch={schoolDataFetch}
                />
              );
            })
          ) : (
            <></>
          )}
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
