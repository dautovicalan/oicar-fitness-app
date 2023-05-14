import React from "react";
import '../Styles/MealPlanStyle.css'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import "../Styles/MealPlanStyle.css";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MealPlan = () => {

  const myList = [
		{ id: 1, mealType: "Breakfast"},
		{ id: 2, mealType: "Lunch"},
		{ id: 3, mealType: "Dinner"},		
	];

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
										<h3>{item.mealType}</h3>
										
									</Paper>
								</div>
							);
						})}
					</div>
				</Box>
			</div>
		</div>
  )
};

export default MealPlan;
