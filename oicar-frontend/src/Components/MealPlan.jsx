import React, { useState } from "react";
import "../Styles/MealPlanStyle.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import "../Styles/MealPlanStyle.css";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const MealPlan = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [dateClicked, setDateClicked] = useState(false);
	const [mealData, setMealData] = useState([]);
	const [breakfastFood, setBreakfastFood] = useState([]);
	const [lunchFood, setLunchFood] = useState([]);
	const [dinnerFood, setDinnerFood] = useState([]);
	const [formattedDate, setFromattedDate] = useState("");

	const userId = sessionStorage.getItem("id");

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setDateClicked(true);
		console.log(date);
	};

	useEffect(() => {
		if (selectedDate !== null) {
			var mealTypeIdTemp;
			setBreakfastFood([]);
			setLunchFood([]);
			setDinnerFood([]);
			const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
			const year = dateObj.getFullYear();
			const month = String(dateObj.getMonth() + 1).padStart(2, "0");
			const day = String(dateObj.getDate()).padStart(2, "0");
			var formattedDateTemp = `${year}-${month}-${day}`;
			setFromattedDate(`${year}-${month}-${day}`);
			console.log("formattedDateTemp" + formattedDateTemp);
			console.log("userID" + userId);

			fetch(
				`http://localhost:5280/api/Meal/ByDate?idUser=${userId}&date=${formattedDateTemp}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log("data1" + data[0].foods[0].name);
					mealTypeIdTemp = data[0].mealType.id;
					if (mealTypeIdTemp === 1) {
						setBreakfastFood(data[0].foods);
					}
					if (mealTypeIdTemp === 2) {
						setLunchFood(data[0].foods);
					}
					if (mealTypeIdTemp === 3) {
						setDinnerFood(data[0].foods);
					}

					// console.log("breakfastFood" + breakfastFood);
					//console.log("lunchFood" + lunchFood);
					// console.log("dinnerFood" + dinnerFood);
				})

				.catch((error) => {
					console.error(error);
				});
		}
	}, [selectedDate]);

	const handleBreakfastClick = () => {
		if (!selectedDate) return; // Handle case when selectedDate is null or undefined

		const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, "0");
		const day = String(dateObj.getDate()).padStart(2, "0");
		const formattedDate = `${year}-${month}-${day}`;

		const state = {
			selectedDate: formattedDate,
			mealTypeId: 1,
		};

		console.log(formattedDate);
		const urlEncodedState = encodeURIComponent(JSON.stringify(state));
		navigate(`/addmeal?state=${urlEncodedState}`);
	};

	const handleLunchClick = () => {
		if (!selectedDate) return; // Handle case when selectedDate is null or undefined

		const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, "0");
		const day = String(dateObj.getDate()).padStart(2, "0");
		const formattedDate = `${year}-${month}-${day}`;

		const state = {
			selectedDate: formattedDate,
			mealTypeId: 2,
		};

		console.log(formattedDate);
		const urlEncodedState = encodeURIComponent(JSON.stringify(state));
		navigate(`/addmeal?state=${urlEncodedState}`);
	};

	const handleDinnerClick = () => {
		if (!selectedDate) return; // Handle case when selectedDate is null or undefined

		const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
		const year = dateObj.getFullYear();
		const month = String(dateObj.getMonth() + 1).padStart(2, "0");
		const day = String(dateObj.getDate()).padStart(2, "0");
		const formattedDate = `${year}-${month}-${day}`;

		const state = {
			selectedDate: formattedDate,
			mealTypeId: 3,
		};

		console.log(formattedDate);
		const urlEncodedState = encodeURIComponent(JSON.stringify(state));
		navigate(`/addmeal?state=${urlEncodedState}`);
	};

	const navigate = useNavigate();
	const handleClick = (item) => {
		const state = {
			item,
			mealType: item.mealType,
		};
		const urlEncodedState = encodeURIComponent(JSON.stringify(state));
		navigate(`/addmeal?state=${urlEncodedState}`);
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
						height: "70vh",
						backgroundColor: "whitesmoke",
						m: 1,
						p: 1,
					}}
				>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DateCalendar
							value={selectedDate}
							onChange={handleDateChange}
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

					<Button
						onClick={handleBreakfastClick}
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
						Add Breakfast
					</Button>
					<Button
						onClick={handleLunchClick}
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
						Add Lunch
					</Button>
					<Button
						onClick={handleDinnerClick}
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
						Add Dinner
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
					<Box
						style={{
							textAlign: "center",
							alignItems: "flex-start",
						}}
						sx={{
							display: "flex",
							flexDirection: "column",
							backgroundColor: "yellow",
							width: "33%",
							justifyContent: "flex-start",
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
							gap: "10px",
						}}
					>
						<h2>BREAKFAST</h2>
						<div className="item-row">
							{breakfastFood.map((item) => {
								return (
									<div className="item" style={{ marginBottom: "10px" }}>
										<Paper
											className="item-box-meal"
											onClick={() => handleClick(item)}
										>
											<h3>{item.name}</h3>
											<p>100g</p>
											<p>Proteins: {item.proteinsPer100g}</p>
											<p>Calories: {item.caloriesPer100g}</p>
										</Paper>
									</div>
								);
							})}
						</div>
					</Box>

					<Box
						style={{
							textAlign: "center",
							alignItems: "flex-start",
						}}
						sx={{
							display: "flex",
							flexDirection: "column",
							backgroundColor: "green",
							width: "33%",
							justifyContent: "flex-start",
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
							gap: "10px",
						}}
					>
						<h2>LUNCH</h2>
						<div className="item-row">
							{lunchFood.map((item) => {
								return (
									<div className="item">
										<Paper
											className="item-box-meal"
											onClick={() => handleClick(item)}
										>
											<h3>{item.name}</h3>
											<p>100g</p>
											<p>Proteins: {item.proteinsPer100g}</p>
											<p>Calories: {item.caloriesPer100g}</p>
										</Paper>
									</div>
								);
							})}
						</div>
					</Box>

					<Box
						style={{
							textAlign: "center",
							alignItems: "flex-start",
						}}
						sx={{
							display: "flex",
							flexDirection: "column",
							backgroundColor: "red",
							width: "33%",
							justifyContent: "flex-start",
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
							gap: "10px",
						}}
					>
						<h2>DINNER</h2>
						<div className="item-row">
							{dinnerFood.map((item) => {
								return (
									<div className="item-meal">
										<Paper
											className="item-box-meal"
											onClick={() => handleClick(item)}
										>
											<h3>{item.name}</h3>
											<p>100g</p>
											<p>Proteins: {item.proteinsPer100g}</p>
											<p>Calories: {item.caloriesPer100g}</p>
										</Paper>
									</div>
								);
							})}
						</div>
					</Box>
				</Box>
			</div>
		</div>
	);
};

export default MealPlan;
