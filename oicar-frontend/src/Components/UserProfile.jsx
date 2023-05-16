import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Alert, Avatar, Container, TextField } from "@mui/material";
import { Box, Button } from "@material-ui/core";
import "../Styles/UserProfile.css";
import { UserPreferencesContext } from "../Context/UserPreferencesContext";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [userPreferencesData, setUserPreferencesData] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Get data from session storage
  const userID = sessionStorage.getItem("id");
  const userJWT = sessionStorage.getItem("jwt");

  console.log(userID);

  useEffect(() => {
    fetch(`http://localhost:5280/api/Account/GetUser?id=${userID}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userJWT, // add the JWT token here
      },
    })
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:5280/api/UserPreferences/GetUserPreferences?id=${userID}`
    )
      .then((response) => response.json())
      .then((data) => setUserPreferencesData(data));
  }, []);

  const handleChangePasswordClick = async (event) => {
    var textField = document.getElementById("passwordChange");
    var newPasswordValue = textField.value;

    try {
      const response = await fetch("/api/Account/ChangePassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: newPasswordValue,
        }),
      });
      if (response.status === 200) {
        alert("Success")
      } else {
        alert("Failed!")
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Privremeno
  const picture = "https://freesvg.org/img/abstract-user-flat-4.png";
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change password
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordChange"
            label="Password"
            type="password"
            id="passwordChange"
          />
          <Button
            type="submit"
            fullWidth
            onClick={handleChangePasswordClick}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Change
          </Button>
        </Container>
      </Modal>
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
          <h2>{userData.email}</h2>
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
          <h2>
            {userPreferencesData.newsletter ? "Subscribed" : "Not subscribed"}
          </h2>
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
          onClick={handleOpen}
          style={{ backgroundColor: "darkblue", color: "white" }}
        >
          Change password
        </Button>{" "}
      </Container>
    </div>
  );
};

export default UserProfile;
