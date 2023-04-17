import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import "../Styles/WorkoutPlanStyle.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

const AddWorkout = () => {
	const navigate = useNavigate();
	const [totalPages, setTotalPages] = useState(110);
	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(18);
	const [exerciseData, setExerciseData] = useState([]);
	const [displayedItems, setDisplayedItems] = useState([]);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const filteredItems = exerciseData.filter((item) =>
		item.name.toLowerCase().includes(searchText.toLowerCase())
	);

	useEffect(() => {
		fetch("http://localhost:5280/api/Exercise")
			.then((response) => response.json())
			.then((data) => {
				setExerciseData(data);
				setTotalPages(Math.ceil(data.length / itemsPerPage));
			});
	}, [itemsPerPage]);

	useEffect(() => {
		const filteredData = exerciseData.filter((item) =>
			item.name.toLowerCase().includes(searchText.toLowerCase())
		);
		setDisplayedItems(filteredData.slice(startIndex, endIndex));
	}, [exerciseData, searchText, startIndex, endIndex]);

	const handleClick = (item) => {
		const state = {
			item,
			workoutName: item.name,
			// sets: item.sets,
			// reps: item.reps,
			// weight: item.weight,
		};
		const urlEncodedState = encodeURIComponent(JSON.stringify(state));
		navigate(`/workoutdetails?state=${urlEncodedState}`);
	};

	const handlePageChange = (event, page) => {
		setCurrentPage(page);
	};

	//const displayedItems = filteredItems.slice(startIndex, endIndex);

	const handleSearchTextChange = (event) => {
		setSearchText(event.target.value);
		setCurrentPage(1); // Reset current page when search text changes
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
					>
						<TextField

							id="standard-search"
							label="Search field"
							type="search"
							variant="standard"
							width="50%"
							onChange={(event) => {
								const keyword = event.target.value.toLowerCase();
								const filteredData = exerciseData.filter((item) => {
									return item.name.toLowerCase().includes(keyword);
								});
								setDisplayedItems(filteredData.slice(0, itemsPerPage));
								setTotalPages(Math.ceil(filteredData.length / itemsPerPage));
								setCurrentPage(1);
							}}
						/>
					</Box>
					<div className="item-row" style={{marginTop:"3vh"}}>
						{displayedItems.map((item) => {
							return (
								<div
									className="item"
									style={{
										width: "15%",
										margin: "0px",
										boxSizing: "border-box",
										padding:"0px"
									}}
								>
									<Paper
										className="item-box"
										key={item.id}
										onClick={() => handleClick(item)}
									>
										<h3>{item.name}</h3>
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
					>
						<Pagination
							count={totalPages}
							color="primary"
							page={currentPage}
							onChange={handlePageChange}
						/>
					</Box>
		</div>
	);
};

export default AddWorkout;
