import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import RegistrationForm from "./Components/RegistrationForm";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';

import "./Styles/App.css";
import React from "react";
import SignUp from "./Components/RegistrationForm";


function App() {
  const [redirectPath, setRedirectPath] = useState('/');
      
  return (
    <div>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
      </Routes>
      </Router>
      {/* <Navbar setRedirectPath={setRedirectPath} />
      
      <LandingPage/>
      <LoginForm/>
      <Footer /> */}

      
      
    </div>
  );
}

export default App;
