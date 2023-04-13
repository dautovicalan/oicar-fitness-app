import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import LoginForm from "./Components/LoginForm";
import Navbar from "./Components/Navbar";
import RegistrationStepper from "./Components/RegistrationStepper";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { UserContext } from "./Context/UserContext.js";
import Dashboard from "./Components/Dashboard";
import "./Styles/App.css";
import React from "react";
import { useState } from "react";
import ForgotPassword from "./Components/ForgotPassword";
import UserProfile from "./Components/UserProfile"
import WorkoutPlan from "./Components/WorkoutPlan"
import MealPlan from "./Components/MealPlan"


function App() {

  const [user, setUser] = useState(null);


  return (
    <div>
      <Router>
        <UserContext.Provider value={{user, setUser}}>
        <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationStepper />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workoutplan" element={<WorkoutPlan />} />
            <Route path="/mealplan" element={<MealPlan />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
          <Footer/>
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
