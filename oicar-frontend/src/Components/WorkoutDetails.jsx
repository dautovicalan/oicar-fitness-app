import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography } from "@material-ui/core";
import YouTube from "react-youtube";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { InputAdornment } from "@mui/material";

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
	const [exerciseName, setExerciseName] = useState("");
	const [exerciseGif, setExerciseGif] = useState("");
	const [exerciseId, setExerciseId] = useState(0);
	const [exerciseExists, setExerciseExists] = useState(false);
	const [dateExists, setDateExists] = useState(false);
	const userID = localStorage.getItem("id");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);
	const [weight, setWeight] = useState(0);
	const [exerciseDate, setExerciseDate] = useState("");
	const location = useLocation();
	const classes = useStyles();
	const opts = {
		height: "315",
		width: "100%",
	};
  var isSameDate = false;
	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const stateParam = searchParams.get("state");

		if (stateParam) {
			const stateObject = JSON.parse(decodeURIComponent(stateParam));
			setExerciseName(stateObject.exerciseName);
			setExerciseId(stateObject.exerciseId);
			setExerciseGif(stateObject.exerciseGif);
			setExerciseDate(stateObject.exerciseDate);
		}

		fetch(
			`http://localhost:5280/api/Exercise/GetProgress?idUser=${userID}&exerciseId=${exerciseId}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		)
			.then((response) => {
				if (!response.ok) setExerciseExists(false);

				return response.json();
			})
			.then((data) => {
				if (data.length === 0 || data === undefined) {
					console.log(data);
					setExerciseExists(false);
					setDateExists(false);

				} else {
					setExerciseExists(true);
          data.map((item) => {
					const exerciseDateTemp = new Date(exerciseDate);
					const dataDate = new Date(item.date);
          console.log("tempdate"+exerciseDateTemp);
          console.log("api date"+dataDate);
					isSameDate =
          exerciseDateTemp.getDay() === dataDate.getDay() &&
          exerciseDateTemp.getMonth() === dataDate.getMonth() &&
          exerciseDateTemp.getFullYear() === dataDate.getFullYear();
          });
					
					

					if (isSameDate) {
            setDateExists(true);
						setReps(data[0].numberOfReps);
						setSets(data[0].numberOfSets);
						setWeight(data[0].weight);
					}
          console.log("is same date" + isSameDate + dateExists);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}, [location.search, exerciseId, exerciseDate, dateExists]);

	const handleSubmit = () => {
		const data = {
			userID: userID,
			exerciseId: exerciseId,
			numberOfSets: sets,
			numberOfReps: reps,
			weight: weight,
			date: exerciseDate,
		};
		console.log(data);
		fetch("http://localhost:5280/api/Exercise/CreateProgress", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (response.status === 200) {
					alert("Success");
					window.location.reload();
				} else {
					alert("Failed!");
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	const isButtonDisabled = !sets || !reps || !weight;

	return (
		<Box sx={{ height: "72vh" }}>
			<Paper className={classes.root}>
				<Typography variant="h5" component="h2" gutterBottom>
					{exerciseName.toUpperCase()}
				</Typography>
				<hr />
				<br />
				<div>
        <h4 style={{ color: "grey", textTransform: "uppercase" }}>Date of this exercise: {exerciseDate}</h4>
					<img
						src={exerciseGif}
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
				{dateExists ? (
					<div>
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
					</div>
				) : (
					<div>
						<Typography color="textSecondary" gutterBottom>
							<br />
							<TextField
								margin="normal"
								required
								width="50%"
								id="sets"
								label="How many sets?"
								name="sets"
								autoFocus
								type="number"
								onChange={(e) => setSets(e.target.value)}
								InputProps={{
									inputProps: {
										min: 0, // Specify the minimum value allowed (optional)
										step: 1, // Specify the step value for increments/decrements (optional)
									},
									endAdornment: (
										<InputAdornment position="end">Sets</InputAdornment>
									),
								}}
							/>
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							<TextField
								margin="normal"
								required
								width="50%"
								id="reps"
								label="How many reps in a set?"
								name="reps"
								autoFocus
								type="number"
								onChange={(e) => setReps(e.target.value)}
								InputProps={{
									inputProps: {
										min: 0, // Specify the minimum value allowed (optional)
										step: 1, // Specify the step value for increments/decrements (optional)
									},
									endAdornment: (
										<InputAdornment position="end">Reps</InputAdornment>
									),
								}}
							/>
						</Typography>
						<Typography color="textSecondary" gutterBottom>
							<TextField
								margin="normal"
								required
								width="50%"
								id="weight"
								label="Weight used"
								name="weight"
								autoFocus
								type="number"
								onChange={(e) => setWeight(e.target.value)}
								InputProps={{
									inputProps: {
										min: 0, // Specify the minimum value allowed (optional)
										step: 1, // Specify the step value for increments/decrements (optional)
									},
									endAdornment: (
										<InputAdornment position="end">kg</InputAdornment>
									),
								}}
							/>
						</Typography>

						<Button
							onClick={handleSubmit}
							width="50%"
							variant="contained"
							sx={{
								mt: 3,
								mb: 5,
								width: "50%",
								backgroundColor: "black",
								"&:hover": {
									backgroundColor: "orange",
									color: "black",
								},
							}}
							disabled={isButtonDisabled}
						>
							Submit
						</Button>
					</div>
				)}
			</Paper>
		</Box>
	);
};

export default WorkoutDetails;
