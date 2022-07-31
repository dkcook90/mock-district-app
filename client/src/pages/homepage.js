import React, { useEffect } from 'react';
import Signup from '../components/signup'
import Auth from '../utils/auth'
import Dashboard from './dashboard';

function Home() {

  const reRoute = () => {
    if(Auth.loggedIn()) {
      return <Dashboard />
    } else {
      return <Signup />
    }
  };


    return (
      <>
      {reRoute()}
      </>
    );
  }
  
  export default Home;