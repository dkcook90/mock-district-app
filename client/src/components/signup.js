import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {Container, Row, Col} from 'react-bootstrap'
import Auth from "../utils/auth";

function Signup() {

  const [signupFormState, setSignupFormState] = useState({
    signupName: '',
    signupEmail: '',
    signupPassword: '',
    signupCheckPassword: '',
});

const handleSignupChange = (event) => {
  const { id, value } = event.target;

  setSignupFormState({
      ...signupFormState,
      [id]: value,
  });
};

    const handleSignupSubmit = (event) => {
        event.preventDefault()
        console.log('submitted')
        if( signupFormState.signupPassword === signupFormState.signupCheckPassword) {
            fetch('/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: signupFormState.signupName,
                    email: signupFormState.signupEmail,
                    password: signupFormState.signupPassword,
                })
            }).then((res) => { 
                return res.json()
            }).then((data) => {
                if(data.token){
                  Auth.login(data.token)
                }
            })
        } else {
          window.alert('Passwords do not match');
        }
    }

    const [loginFormState, setLoginFormState] = useState({
      loginEmail: '',
      loginPassword: '',
  });

  const handleLoginChange = (event) => {
    const { id, value } = event.target;

    setLoginFormState({
        ...loginFormState,
        [id]: value,
    });
  };

    const handleLoginSubmit = (event) => {
        event.preventDefault()
        console.log('logged in')
            fetch('/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: loginFormState.loginEmail,
                    password: loginFormState.loginPassword,
                })
            }).then((res) => { 
                return res.json()
            }).then((data) => {
              console.log(data.token)
                if(data.token){
                  Auth.login(data.token)
                }
            });
    }

    const [pageState, setpageState] = useState('signup')

    const pageSwitch = (event) => {
      event.preventDefault()
      if (pageState === 'signup'){
        setpageState('login')
      } else {
        setpageState('signup')
      }
    }

    const pageRender = () => {
      if(pageState === 'signup'){
        console.log('signup')
        return (<Container className="m-auto mt-5">
        <Form onSubmit={handleSignupSubmit}>
          <Form.Group className="mb-3" controlId="signupName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="Please enter your name" onChange={handleSignupChange}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="signupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={handleSignupChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="signupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handleSignupChange}/>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="signupCheckPassword">
            <Form.Label>Re-Enter Password</Form.Label>
            <Form.Control type="password" onChange={handleSignupChange}/>
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
         
          <Button className="float-end" variant="primary" id="login" onClick={pageSwitch}>
           Or Log In
          </Button>
        </Form>
      </Container>)
      } else {
        console.log('login')
        return (<Container className="m-auto mt-5">
        <Form onSubmit={handleLoginSubmit}>
  
          <Form.Group className="mb-3" controlId="loginEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={handleLoginChange}/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="loginPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={handleLoginChange}/>
          </Form.Group>
  
          <Button variant="primary" type="submit">
            Log In
          </Button>
         
          <Button className="float-end" variant="primary" id="login" onClick={pageSwitch}>
            Or Sign Up
          </Button>
        </Form>
      </Container>)
      }
    }

  return (
    <>
    {pageRender()}
    </>
  );
}

export default Signup;
