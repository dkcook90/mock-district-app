import React, { useEffect } from "react";
import Signup from "../components/signup";
import Auth from "../utils/auth";
import Dashboard from "./dashboard";

function Home() {
  const reRoute = () => {
    //conditional rendering function, if the user is logged in show the dashboard, else show the signup page
    if (Auth.loggedIn()) {
      return <Dashboard />;
    } else {
      return <Signup />;
    }
  };

  return <>{reRoute()}</>;
}

export default Home;
