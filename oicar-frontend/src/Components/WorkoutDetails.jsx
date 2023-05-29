import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import YouTube from "react-youtube";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({


  root: {
    maxWidth: 600,
    margin: "auto",
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    textAlign: "center",
    padding: theme.spacing(2),
    background: "#F5F5F5",
    boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.2)",
  },
  videoContainer: {
    position: "relative",
    paddingBottom: "56.25%", // 16:9
    paddingTop: 25,
    height: 0,
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

// fetch(
// 	`http://localhost:5280/api/CustomWorkout/GetWorkout?idUser=${userID}&idWorkout=${data.id}`,
// 	{
// 	  headers: {
// 		"Content-Type": "application/json",
// 	  },
// 	}
//   )
// 	.then((response) => {
// 	  if (!response.ok) {
// 		setWorkoutExists(false);
// 	  }
// 	  setWorkoutExists(true);

// 	  return response.json();
// 	})
// 	.then((data_2) => {
// 	  const exerciseList = data_2.exercises.map((exercise) => ({
// 		id: exercise.id,
// 		name: exercise.name,
// 		gifUrl: exercise.gifUrl,
// 	  }));
// 	  console.log(data_2);
// 	  setCopyList([...copyList, exerciseList]);
// 	})
// 	.catch((error) => {
// 	  console.error(error);
// 	  setWorkoutExists(false);
// 	});

const WorkoutDetails = () => {
  const location = useLocation();
  const item = location.state;
  const searchParams = new URLSearchParams(window.location.search);
  const state = JSON.parse(decodeURIComponent(searchParams.get("state")));

  const [workout, setWorkout] = useState(null);

  const classes = useStyles();
  const workoutName = state.item.workoutName;
  const sets = state.item.sets;
  const reps = state.item.reps;
  const weight = state.item.weight;
  const gifSrc = "http://d205bpvrqc9yn1.cloudfront.net/0001.gif";
  const opts = {
    height: "315",
    width: "100%",
  };

  return (
    <Box sx={{ height: "72vh" }}>
      <Paper className={classes.root}>
        <Typography variant="h5" component="h2" gutterBottom>
          {workoutName}
        </Typography>
        <hr />
        <br />
        <div>
          <img
            src={gifSrc}
            alt="Gif"
            style={{
              borderRadius: "30%",
              border: "5px solid #ccc",

              width: "300px",
              height: "300px",
              objectFit: "cover",
            }}
          />
        </div>
        <Typography color="textSecondary" gutterBottom>
          <br />
          Number of sets: {sets}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Reps per set: {reps}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          Weight used: {weight} kg
        </Typography>
      </Paper>
    </Box>
  );
};

export default WorkoutDetails;
