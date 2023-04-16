import React from "react";
import { Box } from "@mui/material";
import Paper from "@mui/material";
import '../Styles/MealPlanStyle.css'

const MealPlan = () => {

  const myList = [
		{ id: 1, mealName: "Carrot", Calories: 30},
		{ id: 2, mealName: "Chicken", Calories: 30},
		{ id: 3, mealName: "Apple", Calories: 30},
		{ id: 4, mealName: "Strawberry", Calories: 30},
		{ id: 5, mealName: "Blackberry", Calories: 30},		
		{ id: 5, mealName: "Blackberry", Calories: 30},		
		{ id: 5, mealName: "Blackberry", Calories: 30},		
		{ id: 5, mealName: "Blackberry", Calories: 30},		
	];



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
          <h1>Meals</h1>
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
									<div className="item-box">
										<h3>{item.mealName}</h3>
										<p>Calories: {item.Calories} cal.</p>
									</div>
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
