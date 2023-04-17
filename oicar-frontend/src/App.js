import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./Context/UserContext.js";
import { UserPreferencesContext } from "./Context/UserPreferencesContext.js";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import LandingPage from "./Components/LandingPage";
import LoginForm from "./Components/LoginForm";
import RegistrationStepper from "./Components/RegistrationStepper";
import ForgotPassword from "./Components/ForgotPassword";
import UserProfile from "./Components/UserProfile";
import WorkoutPlan from "./Components/WorkoutPlan";
import MealPlan from "./Components/MealPlan";
import HomePage from "./Components/HomePage";
import AddWorkout from "./Components/AddWorkout";
import WorkoutDetails from "./Components/WorkoutDetails";
import "./Styles/App.css";

function App() {
  const [userData, setUserData] = useState({});
  const [userPreferencesData, setUserPreferencesData] = useState({});

  useEffect(() => {
    fetch("http://localhost:5280/api/Account/GetUser?id=28")
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5280/api/UserPreferences/GetUserPreferences?id=28")
      .then((response) => response.json())
      .then((data) => setUserPreferencesData(data));
  }, []);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <UserPreferencesContext.Provider value={{ userPreferencesData, setUserPreferencesData }}>
            <Navbar />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegistrationStepper />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/workoutplan" element={<WorkoutPlan />} />
              <Route path="/mealplan" element={<MealPlan />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/addworkout" element={<AddWorkout />} />
              <Route path="/workoutdetails" element={<WorkoutDetails />} />
            </Routes>
            <Footer />
          </UserPreferencesContext.Provider>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
