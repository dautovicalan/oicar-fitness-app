import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Avatar, Container } from "@mui/material";
import { Box, Button } from "@material-ui/core";
import "../Styles/UserProfile.css";
import { UserPreferencesContext } from "../Context/UserPreferencesContext";


const UserProfile = () => {
	const [userData, setUserData] = useState({});
  const [userPreferencesData, setUserPreferencesData] = useState({});
	
	// Get data from session storage
	const userID = sessionStorage.getItem("id");

	console.log(userID)

	useEffect(() => {
		
		  fetch(`http://localhost:5280/api/Account/GetUser?id=${userID}`)
		  .then((response) => response.json())
		  .then((data) => setUserData(data));
		
	  }, []);
	
	  useEffect(() => {
		  fetch(`http://localhost:5280/api/UserPreferences/GetUserPreferences?id=${userID}`)
		  .then((response) => response.json())
		  .then((data) => setUserPreferencesData(data));
		
	  }, []);
	
  
  //Privremeno
  const picture = "https://freesvg.org/img/abstract-user-flat-4.png";
	return (
		<div>
			<Container
				sx={{ justifyContent: "center", alignItems: "center", display: "flex" }}
			>
				<h1>Profile</h1>
			</Container>
			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box>
					<Avatar
						alt="Test user"
						sx={{
							width: 250,
							height: 250,
							boxShadow: "0px 8px 10px rgba(0,0,0,0.3)",
						}}
						src={picture}
					/>
				</Box>
			</Container>
			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					width: "30%",
				}}
				className="info-container"
			>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>Email: </h2>
				</Container>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>
						{userData.email}
					</h2>
				</Container>
			</Container>

      <Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					width: "30%",
				}}
				className="info-container"
			>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>Name: </h2>
				</Container>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>
						{userData.name} {userData.surname}
					</h2>
				</Container>
			</Container>

			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					width: "30%",
				}}
				className="info-container"
			>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>Goal: </h2>
				</Container>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>{userPreferencesData.goal}</h2>
				</Container>
			</Container>

      <Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					width: "30%",
				}}
				className="info-container"
			>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>Workouts per week: </h2>
				</Container>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>{userPreferencesData.workoutNumberPerWeek}</h2>
				</Container>
			</Container>

			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					width: "30%",
				}}
				className="info-container"
			>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>Weight: </h2>
				</Container>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>{userPreferencesData.weight} kg</h2>
				</Container>
			</Container>
			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					width: "30%",
				}}
				className="info-container"
			>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>Height: </h2>
				</Container>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>{userPreferencesData.height} cm</h2>
				</Container>
			</Container>
			<Container
				sx={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "row",
					alignItems: "center",
					width: "30%",
				}}
				className="info-container"
			>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>Newsletter: </h2>
				</Container>
				<Container
					sx={{
						display: "flex",
						justifyContent: "flex-start",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<h2>{userPreferencesData.newsletter?"Subscribed":"Not suscribed"}</h2>
				</Container>
			</Container>
			<Container
				sx={{
					justifyContent: "center",
					alignItems: "center",
					display: "flex",
					marginTop: "3vh",
				}}
			>
				<Button
					variant="contained"
					style={{ backgroundColor: "darkblue", color: "white" }}
				>
					Edit Profile
				</Button>{" "}
			</Container>
		</div>
	);
};

export default UserProfile;
