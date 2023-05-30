import React, { useState } from "react";
import { LocalizationProvider, DateAdapter } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { convertLength } from "@mui/material/styles/cssUtils";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Close";

const WorkoutPlan = () => {
	const [myList, setMyList] = useState({});
	const [copyList, setCopyList] = useState([]);
	const [selectedDate, setSelectedDate] = useState(null);
	const [workoutID, setWorkoutID] = useState(0);
	const [formattedDate, setFromattedDate] = useState("");
	const [workoutExists, setWorkoutExists] = useState(true);
	const [dateClicked, setDateClicked] = useState(false);
	const userID = sessionStorage.getItem("id");
	const navigate = useNavigate();

	const handleClick = (item) => {
		const state = {
			exerciseName: item.name,
			exerciseId: item.id,
			exerciseGif: item.gifUrl,
			exerciseDate: formattedDate,
		};
		const urlEncodedState = encodeURIComponent(JSON.stringify(state));
		navigate(`/workoutdetails?state=${urlEncodedState}`);
	};

	const handleDeleteClick = async (item) => {
		console.log("delete clicked");
		try {
			const response = await fetch(
				`http://localhost:5280/api/CustomWorkout/DeleteExercise?idWorkout=${workoutID}&exerciseId=${item.id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						//"Authorization": "Bearer " + userJWT
					},
				}
			);
			if (response.status === 200) {
				alert("Success");
				window.location.href = "/workoutplan";
			} else {
				alert("Failed!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setDateClicked(true);
		setCopyList([]);
		console.log(date);
	};

	const handleDeleteWorkoutClick = async () => {
		try {
			const response = await fetch(
				`http://localhost:5280/api/CustomWorkout/Delete?idUser=${userID}&idWorkout=${workoutID}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						//"Authorization": "Bearer " + userJWT
					},
				}
			);
			if (response.status === 200) {
				alert("Success");
				window.location.href = "/workoutplan";
			} else {
				alert("Failed!");
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		console.log(copyList);
	}, [copyList]);

	useEffect(() => {
		if (selectedDate !== null) {
			const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
			const year = dateObj.getFullYear();
			const month = String(dateObj.getMonth() + 1).padStart(2, "0");
			const day = String(dateObj.getDate()).padStart(2, "0");
			var formattedDateTemp = `${year}-${month}-${day}`;
			setFromattedDate(`${year}-${month}-${day}`);

			fetch(
				`http://localhost:5280/api/CustomWorkout/ByDate?idUser=${userID}&date=${formattedDateTemp}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((response) => {
					if (!response.ok) {
						setWorkoutExists(false);
					}
					return response.json();
				})
				.then((data) => {
					setWorkoutID(data.id);
					fetch(
						`http://localhost:5280/api/CustomWorkout/GetWorkout?idUser=${userID}&idWorkout=${data.id}`,
						{
							headers: {
								"Content-Type": "application/json",
							},
						}
					)
						.then((response) => {
							if (!response.ok) {
								setWorkoutExists(false);
							}
							setWorkoutExists(true);

							return response.json();
						})
						.then((data_2) => {
							const exerciseList = data_2.exercises.map((exercise) => ({
								id: exercise.id,
								name: exercise.name,
								gifUrl: exercise.gifUrl,
							}));
							console.log(data_2);
							setCopyList([...copyList, exerciseList]);
						})
						.catch((error) => {
							console.error(error);
							setWorkoutExists(false);
						});
				})
				.catch((error) => {
					console.error(error);
					setWorkoutExists(false);
				});
		}
	}, [selectedDate]);

	const handleDateClick = () => {
		if (!selectedDate) return; // Handle case when selectedDate is null or undefined

		const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, "0");
		const day = String(dateObj.getDate()).padStart(2, "0");
		const formattedDate = `${year}-${month}-${day}`;

		const state = {
			selectedDate: formattedDate,
		};

		console.log(formattedDate);
		const urlEncodedState = encodeURIComponent(JSON.stringify(state));
		navigate(`/workouttype?state=${urlEncodedState}`);
	};
	return (
		<div>
			<div style={{ display: "flex", flexDirection: "row", height: "75vh" }}>
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
							value={selectedDate}
							onChange={handleDateChange}
							//renderInput={(props) => <input {...props} />}
							sx={{
								width: "80%",
								height: "600px",
								"& .MuiPickersDay-root.Mui-selected": {
									backgroundColor: "orange",
									color: "black",
									"&:hover": {
										backgroundColor: "orange",
										color: "black",
									},
								},
								"& .MuiPickersDay-root.Mui-selected:not(.Mui-focusVisible)": {
									backgroundColor: "orange",
									color: "black",
								},
							}}
						/>
					</LocalizationProvider>

					{workoutExists && copyList.length > 0 ? (
						<Button
							onClick={handleDateClick}
							fullWidth
							variant="contained"
							disabled
							sx={{
								mt: 3,
								mb: 2,
								width: "50%",
								backgroundColor: "black",
								"&:hover": {
									backgroundColor: "orange",
									color: "black",
								},
							}}
						>
							Add workout
						</Button>
					) : (
						<Button
							onClick={handleDateClick}
							fullWidth
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								width: "50%",
								backgroundColor: "black",
								"&:hover": {
									backgroundColor: "orange",
									color: "black",
								},
							}}
						>
							Add workout
						</Button>
					)}

					{workoutExists && copyList.length > 0 ? (
						<Button
							onClick={handleDeleteWorkoutClick}
							width="100"
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								width: "50%",
								backgroundColor: "black",
								"&:hover": {
									backgroundColor: "orange",
									color: "black",
								},
							}}
						>
							Delete workout
						</Button>
					) : (
						<Button
							onClick={handleDeleteWorkoutClick}
							width="100"
              disabled
							variant="contained"
							sx={{
								mt: 3,
								mb: 2,
								width: "50%",
								backgroundColor: "black",
								"&:hover": {
									backgroundColor: "orange",
									color: "black",
								},
							}}
						>
							Delete workout
						</Button>
					)}
				</Box>
				<Box
					sx={{
						display: "flex",
						width: "100%",
						m: 1,
						p: 1,
					}}
				>
					<div className="item-row-plan">
						{workoutExists && copyList.length > 0 ? (
							copyList[0].map((item) => (
								<div key={item.id} className="item-plan">
									<Paper
										className="item-box-plan"
										onClick={(e) => {
											e.stopPropagation();
											handleClick(item);
										}}
										sx={{ marginBottom: "1px" }}
									>
										<IconButton
											aria-label="delete"
											size="large"
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteClick(item);
											}}
											sx={{ position: "absolute", top: 0, right: 0 }}
										>
											<DeleteIcon />
										</IconButton>

										<h3>
											{item.name.charAt(0).toUpperCase() + item.name.slice(1)}
										</h3>

										{/* <p>Sets: {item.sets}</p>
        <p>Reps: {item.reps}</p>
        <p>Weight: {item.weight} kg</p> */}
									</Paper>
								</div>
							))
						) : copyList === [] ? (
							<div
								style={{
									textDecoration: "bold",
									fontSize: "10vh",
								}}
							>
								No workouts found for this day.
							</div>
						) : (
							<div
								style={{
									fontWeight: "bold",
									fontSize: "8vh",
									color: "#666",
									fontFamily: "Arial, sans-serif",
								}}
							>
								No workouts found for this day.
							</div>
						)}
					</div>
				</Box>
			</div>
			<style>
				{`
          .item {
            margin-right: 50px; /* Adjust the spacing as per your requirements */
          }
        `}
			</style>
		</div>
	);
};

export default WorkoutPlan;
