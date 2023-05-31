import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Alert, Avatar, Container, TextField } from "@mui/material";
import { Box, Button } from "@material-ui/core";
import "../Styles/UserProfile.css";
import { UserPreferencesContext } from "../Context/UserPreferencesContext";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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

export const fitnessGoals = Array.of(
  { id: 1, text: "Be More Active" },
  { id: 2, text: "Lose Weight" },
  { id: 3, text: "Stay Toned" },
  { id: 4, text: "Build Muscle" },
  { id: 5, text: "Reduce Stress" }
);

export const workoutsPerWeek = Array.of(
  { id: 2, text: "2 - 3" },
  { id: 3, text: "3 - 4" },
  { id: 4, text: "4 - 5" },
  { id: 5, text: "5+" }
);

export const newsletterAnswers = Array.of(
  { id: 1, text: "Yes" },
  { id: 2, text: "No" }
);

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [userPreferencesData, setUserPreferencesData] = useState({});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  const [openEdit, setOpenEdit] = React.useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);

  // Get data from session storage
  const userID = sessionStorage.getItem("id");
  const userJWT = sessionStorage.getItem("jwt");

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
          Authorization: "Bearer " + userJWT,
        },
        body: JSON.stringify({
          email: userData.email,
          password: newPasswordValue,
        }),
      });
      if (response.status === 200) {
        alert("Success");
      } else {
        alert("Failed!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {};

  const handleDeleteAccountClick = async (event) => {
    try {
      const response = await fetch(
        `http://localhost:5280/api/Account/Delete?idUser=${userID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + userJWT,
          },
        }
      );
      if (response.status === 200) {
        alert("Success");
        sessionStorage.clear("id");
        sessionStorage.clear("jwt");
        window.location.href = "/login";
      } else {
        alert("Failed!");
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
      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Fitness goal
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Goal"
              required // added this
              // error={!fitnessGoalSelected} // added this
              // value={fitnessGoalSelected}
              // onChange={(e) => setFitnessGoalSelected(e.target.value)}
            >
              {fitnessGoals.map((goal) => (
                <MenuItem key={goal.id} value={goal.id}>
                  {goal.text}
                </MenuItem>
              ))}
            </Select>
            {/* {!fitnessGoalSelected && (
              <FormHelperText error>Select a fitness goal</FormHelperText>
            )} */}
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Workout goal
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Workout"
              required // added this
              // error={!workoutSelected} // added this
              // value={workoutSelected}
              // onChange={(e) => setWorkoutSelected(e.target.value)}
            >
              {workoutsPerWeek.map((workout) => (
                <MenuItem key={workout.id} value={workout.id}>
                  {workout.text}
                </MenuItem>
              ))}
            </Select>
            {/* {!workoutSelected && (
              <FormHelperText error>Select a workout goal</FormHelperText>
            )} */}
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <TextField
              margin="normal"
              required
              width="50%"
              id="height"
              name="height"
              label="Height (cm)"
              type="number"
              // value={formik.values.height}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.height && Boolean(formik.errors.height)}
              // helperText={formik.touched.height && formik.errors.height}
            />
            <TextField
              margin="normal"
              required
              width="50%"
              id="weight"
              name="weight"
              label="Weight (kg)"
              type="number"
              // value={formik.values.weight}
              // onChange={formik.handleChange}
              // onBlur={formik.handleBlur}
              // error={formik.touched.weight && Boolean(formik.errors.weight)}
              // helperText={formik.touched.weight && formik.errors.weight}
            />
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Newsletter
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              label="Newsletter"
              required // added this
              // error={!workoutSelected} // added this
              // value={workoutSelected}
              // onChange={(e) => setWorkoutSelected(e.target.value)}
            >
              {newsletterAnswers.map((answer) => (
                <MenuItem key={answer.id} value={answer.id}>
                  {answer.text}
                </MenuItem>
              ))}
            </Select>
            {/* {!workoutSelected && (
              <FormHelperText error>Select a workout goal</FormHelperText>
            )} */}
          </FormControl>

          <Button
            type="submit"
            fullWidth
            href="/login"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // onClick={handleUserPreferences}
            // disabled={!fitnessGoalSelected || !workoutSelected}
          >
            Finish
          </Button>
        </Container>
      </Modal>
      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Container sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete Account
          </Typography>
          <p>Are you sure?</p>
          <Button
            type="submit"
            fullWidth
            onClick={handleDeleteAccountClick}
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Delete
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
          style={{
            backgroundColor: "darkblue",
            color: "white",
            margin: "10px",
          }}
        >
          Change password
        </Button>

        <Button
          variant="contained"
          onClick={handleOpenEdit}
          style={{ backgroundColor: "yellow", color: "black", margin: "10px" }}
        >
          Edit
        </Button>

        <Button
          variant="contained"
          onClick={handleOpenDelete}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete Account
        </Button>
      </Container>
    </div>
  );
};

export default UserProfile;
