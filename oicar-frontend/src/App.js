import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import Test from "./Components/Test";

import "./Styles/App.css";
import React from "react";

function App() {

  return (
    <div>
      <Navbar />
      <LoginForm />
      <LandingPage />
      <Footer />
    </div>
  );
}



export default App;
