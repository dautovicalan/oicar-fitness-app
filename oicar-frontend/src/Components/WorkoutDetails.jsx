import React from "react";
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

const WorkoutDetails = () => {
  const location = useLocation();
  const item = location.state;
  const searchParams = new URLSearchParams(window.location.search);
  const state = JSON.parse(decodeURIComponent(searchParams.get('state')));

  const classes = useStyles();
  const workoutName = state.item.workoutName;;
  const sets = state.item.sets;
  const reps = state.item.reps;
  const weight = state.item.weight;
  const youtubeVideo = "ykJmrZ5v0Oo";
  const workoutDescription =
    "This workout targets your biceps and is a great way to build strength in your upper body.";

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
        <Typography variant="body1" gutterBottom>
          {workoutDescription}
        </Typography>
        <div className={classes.videoContainer}>
          <YouTube videoId={youtubeVideo} opts={opts} className={classes.video} />
        </div>
        <Typography color="textSecondary" gutterBottom>
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
