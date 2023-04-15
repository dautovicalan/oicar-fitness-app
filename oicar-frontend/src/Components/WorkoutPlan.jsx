import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import "../Styles/WorkoutPlanStyle.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WorkoutPlan = () => {
	const myList = [
		{ id: 1, workoutName: "Bench press", sets: 3, reps: 3, weight: 100 },
		{ id: 2, workoutName: "Curls", sets: 2, reps: 5, weight: 15 },
		{ id: 3, workoutName: "Lunges", sets: 7, reps: 3, weight: 30 },
		{ id: 4, workoutName: "Push ups", sets: 2, reps: 5, weight: 12 },
		{ id: 5, workoutName: "Squats", sets: 3, reps: 7, weight: 10 },
		{ id: 6, workoutName: "Situps", sets: 10, reps: 10, weight: 5 },
		{ id: 7, workoutName: "Side planks", sets: 1, reps: 3, weight: 60 },
		{ id: 8, workoutName: "Planks", sets: 2, reps: 5, weight: 35 },
		{ id: 9, workoutName: "Cable rows", sets: 2, reps: 9, weight: 40 },
		{ id: 10, workoutName: "Dumbell rows", sets: 3, reps: 15, weight: 20 },
		{ id: 11, workoutName: "Bulgarian squats", sets: 9, reps: 20, weight: 15 },
		{ id: 12, workoutName: "Rows", sets: 4, reps: 11, weight: 30 },
	];

	const navigate = useNavigate();

  const handleClick = (item) => {
    const state = {
      item,
      workoutName: item.workoutName,
      sets: item.sets,
      reps: item.reps,
      weight: item.weight
    };
    const urlEncodedState = encodeURIComponent(JSON.stringify(state));
    navigate(`/workoutdetails?state=${urlEncodedState}`);
  };

	return (
		<div>
			<div style={{ display: "flex", flexDirection: "row" }}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						width: "50%",
						m: 1,
						p: 1,
					}}
				>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar
							sx={{
								width: "80%" /* Set the width to 80% of the parent container */,
								height: "600px" /* Set the height to 600 pixels */,
							}}
						/>
					</LocalizationProvider>

					<Button
						href="/addworkout"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2, width: "50%" }}
					>
						Add a workout
					</Button>
				</Box>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						m: 1,
						p: 1,
					}}
				>
					<div className="item-row">
						{myList.map((item) => {
							return (
								<div className="item">
									<Paper className="item-box" onClick={() => handleClick(item)}>
										<h3>{item.workoutName}</h3>
										<p>Sets: {item.sets}</p>
										<p>Reps: {item.reps}</p>
										<p>Weight: {item.weight} kg</p>
									</Paper>
								</div>
							);
						})}
					</div>
				</Box>
			</div>
		</div>
	);
};

export default WorkoutPlan;
