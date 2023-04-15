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
import "./Styles/App.css";
import React from "react";
import { useState } from "react";
import ForgotPassword from "./Components/ForgotPassword";
import UserProfile from "./Components/UserProfile";
import WorkoutPlan from "./Components/WorkoutPlan";
import MealPlan from "./Components/MealPlan";
import HomePage from "./Components/HomePage";
import AddWorkout from "./Components/AddWorkout";
import WorkoutDetails from "./Components/WorkoutDetails";


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
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/workoutplan" element={<WorkoutPlan />} />
            <Route path="/mealplan" element={<MealPlan />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/addworkout" element={<AddWorkout />} />
            <Route path="/workoutdetails" element={<WorkoutDetails />} />
          </Routes>
          <Footer/>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
