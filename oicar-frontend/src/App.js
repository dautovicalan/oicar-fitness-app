import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import RegistrationForm from "./Components/RegistrationForm";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./Context/UserContext.js";

import "./Styles/App.css";
import React from "react";
import SignUp from "./Components/RegistrationForm";
import { useState } from "react";

function App() {

  const [user, setUser] = useState(null);


  return (
    <div>
      <Router>
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </UserContext.Provider>
      </Router>
      {/* <Navbar setRedirectPath={setRedirectPath} />
      
      <LandingPage/>
      <LoginForm/>
      <Footer /> */}
    </div>
  );
}

export default App;
