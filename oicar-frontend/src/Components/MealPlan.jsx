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
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Close";

const MealPlan = () => {
	const [selectedDate, setSelectedDate] = useState(null);
	const [dateClicked, setDateClicked] = useState(false);
	const [mealData, setMealData] = useState([]);
	const [breakfastFood, setBreakfastFood] = useState([]);
	const [lunchFood, setLunchFood] = useState([]);
	const [dinnerFood, setDinnerFood] = useState([]);
	const [formattedDate, setFromattedDate] = useState("");
	const [breakfastMealId, setBreakfastMealId] = useState(null);
	const [lunchMealId, setLunchMealId] = useState(null);
	const [dinnerMealId, setDinnerMealId] = useState(null);

	const userId = sessionStorage.getItem("id");

	const handleDateChange = (date) => {
		setSelectedDate(date);
		setDateClicked(true);
	};

	const handleDeleteClick = async (item, mealtype) => {
		try {
			var mealId = 0;
			const dateObj = new Date(selectedDate);
			const year = dateObj.getFullYear();
			const month = String(dateObj.getMonth() + 1).padStart(2, "0");
			const day = String(dateObj.getDate()).padStart(2, "0");
			var formattedDateTemp = `${year}-${month}-${day}`;

			const response = await fetch(
				`http://localhost:5280/api/Meal/ByDate?idUser=${userId}&date=${formattedDateTemp}`,
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const data = await response.json();

				for (let i = 0; i < data.length; i++) {
					if (data[i].mealType.id === mealtype) {
						mealId = data[i].id;
						console.log("mealId FIRST FETCH" + mealId);
						break;
					}
				}

				console.log("mealId SECOND FETCH" + mealId);
				console.log("food id = " + item.id);
				const deleteResponse = await fetch(
					`http://localhost:5280/api/Meal/DeleteFood?idMeal=${mealId}&idFood=${item.id}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);

				if (deleteResponse.status === 200) {
					alert("Food deleted successfully!");
					window.location.href = "/mealplan";
				} else {
					alert("Food deletion failed!");
				}
			} else {
				alert("Error retrieving meal data!");
			}
		} catch (error) {
			console.error(error);
		}
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
					// mealTypeIdTemp = data[0].mealType.id;
					for (let i = 0; i < data.length; i++) {
						mealTypeIdTemp = data[i].mealType.id;
						if (mealTypeIdTemp === 1) {
							setBreakfastFood(data[i].foods);
						}
						if (mealTypeIdTemp === 2) {
							setLunchFood(data[i].foods);
						}
						if (mealTypeIdTemp === 3) {
							setDinnerFood(data[i].foods);
						}
					}
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
							borderStyle: "solid",
						}}
						sx={{
							display: "flex",
							flexDirection: "column",
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
									<div className="item" style={{ margin: "30px" }}>
										<Paper
											id={item.id}
											className="item-box-meal"
											onClick={() => handleClick(item)}
										>
											<IconButton
												aria-label="delete"
												size="large"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteClick(item, 1);
												}}
												sx={{ position: "absolute", top: 0, right: 0 }}
											>
												<DeleteIcon />
											</IconButton>
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
							borderStyle: "solid",
						}}
						sx={{
							display: "flex",
							flexDirection: "column",
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
									<div className="item" style={{ margin: "30px" }}>
										<Paper
											className="item-box-meal"
											onClick={() => handleClick(item)}
										>
											<IconButton
												aria-label="delete"
												size="large"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteClick(item, 2);
												}}
												sx={{ position: "absolute", top: 0, right: 0 }}
											>
												<DeleteIcon />
											</IconButton>
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
							borderStyle: "solid",
						}}
						sx={{
							display: "flex",
							flexDirection: "column",
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
									<div className="item-meal" style={{ margin: "30px" }}>
										<Paper
											className="item-box-meal"
											onClick={() => handleClick(item)}
										>
											<IconButton
												aria-label="delete"
												size="large"
												onClick={(e) => {
													e.stopPropagation();
													handleDeleteClick(item, 3);
												}}
												sx={{ position: "absolute", top: 0, right: 0 }}
											>
												<DeleteIcon />
											</IconButton>
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
