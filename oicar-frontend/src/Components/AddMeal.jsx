import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Box from "@mui/material/Box";
import "../Styles/WorkoutPlanStyle.css";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useLocation } from "react-router-dom";

const AddMeal = () => {
	const navigate = useNavigate();

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

	const [breakfastFood, setBreakfastFood] = useState([]);
	const [lunchFood, setLunchFood] = useState([]);
	const [dinnerFood, setDinnerFood] = useState([]);
	const [mealData, setMealData] = useState([]);
	const [selectedMeals, setSelectedMeals] = useState([]);
	const [selectedPaperIds, setSelectedPaperIds] = useState([]);
	const [mealExists, setMealExists] = useState(false);
	const [mealId, setMealId] = useState(null);
	var listIds = [];

	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const userId = sessionStorage.getItem("id");

	const date = query.get("state")
		? JSON.parse(decodeURIComponent(query.get("state"))).selectedDate
		: null;

	const mealTypeId = query.get("state")
		? JSON.parse(decodeURIComponent(query.get("state"))).mealTypeId
		: null;

	useEffect(() => {
		fetch(`http://localhost:5280/api/Food`)
			.then((response) => response.json())
			.then((data) => {
				setMealData(data);
			});
	}, []);

	useEffect(() => {
		if (date !== null) {
			var mealTypeIdTemp;
			const dateObj = new Date(date); // Convert selectedDate to a Date object
			const year = dateObj.getFullYear();
			const month = String(dateObj.getMonth() + 1).padStart(2, "0");
			const day = String(dateObj.getDate()).padStart(2, "0");
			var formattedDateTemp = `${year}-${month}-${day}`;
			console.log("formattedDateTemp" + formattedDateTemp);
			console.log("userID" + userId);

			fetch(
				`http://localhost:5280/api/Meal/ByDate?idUser=${userId}&date=${date}`,
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
					// console.log("data1" + data[0].mealType.id);
					// console.log("data2" + data[1].mealType.id);
					// console.log("data3" + data[2].mealType.id);
					var firstMealType = data[0].mealType;
					var secondMealType = data[1].mealType;
					var thirdMealType = data[2].mealType;

					if (firstMealType.id === mealTypeId) {
						setMealExists(true);
						setMealId(data[0].id);
					}
					if (secondMealType.id === mealTypeId) {
						setMealExists(true);
						setMealId(data[1].id);
					}
					if (thirdMealType.id === mealTypeId) {
						setMealExists(true);
						setMealId(data[2].id);
					}
          console.log("mealId" + mealId);
          console.log("data0 id "+data[0].id);
          console.log("data1 id "+data[1].id);
          console.log("data2 id "+data[2].id);
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}, [mealExists, mealId]);

	const handleSubmit = async (item) => {
		const foodId = item.id;
    var mealIdNew = mealId;
		console.log("mealExists" + mealExists);

		if (mealExists === false) {
			try {
				const response = await fetch("http://localhost:5280/api/Meal/Create", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						idUser: sessionStorage.getItem("id"),
						mealTypeId: mealTypeId,
						date: date,
					}),
				});
				const data = await response.json();
				mealIdNew = data.id;
				console.log("Created meal:", data.id);
			} catch (error) {
				console.error(error);
			}
		}

		try {
			listIds = selectedPaperIds;
			const response = await fetch(
				`http://localhost:5280/api/Meal/AddFood?idMeal=${mealIdNew}&foodId=${foodId}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(listIds),
				}
			);
			if (response.status === 200) {
				alert("Meal and food added successfully!");
				navigate("/mealplan");
			}
			console.log("meal id: " + mealId);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<div style={{ display: "flex", flexDirection: "row", height: "90vh" }}>
				<Box
					sx={{
						backgroundColor: "#f5f5f5",
						display: "flex",
						flexDirection: "column",
						width: "100%",
						m: 1,
						p: 1,
					}}
				>
					<Box
						sx={{
							justifyContent: "center",
							display: "flex",
							width: "100%",
							m: 1,
							p: 1,
						}}
					></Box>

					<div className="item-row" style={{ marginTop: "3vh" }}>
						{mealData.map((item) => {
							const mealName = item.name;
							const isChecked = selectedMeals.includes(mealName);
							const paperId = item.id;
							const isPaperSelected = selectedPaperIds.includes(paperId);
							return (
								<div
									className="item"
									style={{
										width: "15%",
										margin: "0px",
										boxSizing: "border-box",
										padding: "0px",
									}}
								>
									<Paper
										style={{
											backgroundColor: isChecked ? "orange" : "inherit",
										}}
										className="item-box"
										key={item.id}
										onClick={() => handleSubmit(item)}
									>
										<h3>{item.name}</h3>
										<p>100g</p>
										<p>{item.proteinsPer100g} proteins</p>
										<p>{item.caloriesPer100g} calories</p>
									</Paper>
								</div>
							);
						})}
					</div>
				</Box>
			</div>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					m: 1,
					p: 1,
					width: "100%",
				}}
			></Box>
		</div>
	);
};

export default AddMeal;
