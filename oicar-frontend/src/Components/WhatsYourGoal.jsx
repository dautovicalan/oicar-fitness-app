import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import { useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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

const WhatsYourGoal = () => {
	const [fitnessGoalSelected, setFitnessGoalSelected] = useState(null);
	const [workoutSelected, setWorkoutSelected] = useState(null);
	const [checkBoxState, setCheckBoxState] = useState(false);

	const age = localStorage.getItem("age");
	const height = localStorage.getItem("height");
	const weight = localStorage.getItem("weight");
	const userID = sessionStorage.getItem("id");
	const selectedFitnessGoal = fitnessGoals.find((goal) => goal.id === fitnessGoalSelected)?.text;

	const handleUserPreferences = async (e) => {
		e.preventDefault();
		try {
		  const response = await fetch("/api/UserPreferences/Register", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			},
			body: JSON.stringify({
			  height: parseInt(height),
			  weight: parseInt(weight),
			  goal: selectedFitnessGoal,
			  workoutNumberPerWeek: parseInt(workoutSelected),
			  userId: parseInt(userID),
			  newsletter: checkBoxState
			}),
		  });
		  const data = await response.json();
		  localStorage.removeItem("height");
		  localStorage.removeItem("weight");
		  localStorage.removeItem("age");
		  localStorage.removeItem("id")
		  sessionStorage.removeItem("id")

		  window.location.href = "/login"
		} catch (error) {
		  console.error(error);
		}
	  };

	  const handleChange = (e) => {
		setCheckBoxState(e.target.checked)
	  }


	 




	return (
		<div>
			<Container
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<FormControl sx={{ m: 1, minWidth: 300 }}>
					<InputLabel id="demo-simple-select-helper-label">
						Fitness goal
					</InputLabel>
					<Select
						labelId="demo-simple-select-helper-label"
						id="demo-simple-select-helper"
						label="Goal"
						required // added this
						error={!fitnessGoalSelected} // added this
						value={fitnessGoalSelected}
						onChange={(e) => setFitnessGoalSelected(e.target.value)}
					>
						{fitnessGoals.map((goal) => (
							<MenuItem key={goal.id} value={goal.id}>
								{goal.text}
							</MenuItem>
						))}
					</Select>
					{!fitnessGoalSelected && (
						<FormHelperText error>Select a fitness goal</FormHelperText>
					)}
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
						error={!workoutSelected} // added this
						value={workoutSelected}
						onChange={(e) => setWorkoutSelected(e.target.value)}
					>
						{workoutsPerWeek.map((workout) => (
							<MenuItem key={workout.id} value={workout.id}>
								{workout.text}
							</MenuItem>
						))}
					</Select>
					{!workoutSelected && (
						<FormHelperText error>Select a workout goal</FormHelperText>
					)}
				</FormControl>
				<FormControlLabel
                      control={
                        <Checkbox value="allowExtraEmails" onChange={handleChange} color="primary" />
                      }
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
				<Button
					type="submit"
					fullWidth
					href="/login"
					variant="contained"
					sx={{ mt: 3, mb: 2 }}
					onClick={handleUserPreferences}
          disabled={!fitnessGoalSelected || !workoutSelected}
				>
					Finish
				</Button>
			</Container>
		</div>
	);
};

export default WhatsYourGoal;
