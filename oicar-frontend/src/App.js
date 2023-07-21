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
import NavbarLoggedIn from "./Components/NavbarLoggedIn.jsx";
import AddMeal from "./Components/AddMeal.jsx";
import Gdpr from "./Components/Gdpr.jsx";
import WorkoutType from "./Components/WorkoutType.jsx";

function App() {
  // const [userData, setUserData] = useState({});
  // const [userPreferencesData, setUserPreferencesData] = useState({});
  // const [dataLoaded, setDataLoaded] = useState(false);

  // Get data from session storage
  const userID = sessionStorage.getItem("id");

  // console.log(userID);

  // useEffect(() => {
  //   if (dataLoaded) {
  //     fetch(`http://localhost:5280/api/Account/GetUser?id=${userID}`)
  //       .then((response) => response.json())
  //       .then((data) => setUserData(data));
  //   }
  // }, [dataLoaded]);

  // useEffect(() => {
  //   if (dataLoaded) {
  //     fetch(
  //       `http://localhost:5280/api/UserPreferences/GetUserPreferences?id=${userID}`
  //     )
  //       .then((response) => response.json())
  //       .then((data) => setUserPreferencesData(data));
  //   }
  // }, [dataLoaded]);

  // var userID = null;

  // const pull_data = (data) => {
  //   if (data != null) {
  //     userID = data.id
  //     setDataLoaded(true)
  //   }
  //   console.log(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  // };

  return (
    <div>
      <Router>
        {/* <UserContext.Provider value={{ userData, setUserData }}>
          <UserPreferencesContext.Provider
            value={{ userPreferencesData, setUserPreferencesData }}
          > */}
            {userID == null ? <Navbar /> : <NavbarLoggedIn/>}
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
              <Route path="/addmeal" element={<AddMeal />} />
              <Route path="/workoutdetails" element={<WorkoutDetails />} />
              <Route path="/useragreement" element={<Gdpr />} />
              <Route path="/workouttype" element={<WorkoutType />} />
            </Routes>
            <Footer />
          {/* </UserPreferencesContext.Provider>
        </UserContext.Provider> */}
      </Router>
    </div>
  );
}

export default App;
