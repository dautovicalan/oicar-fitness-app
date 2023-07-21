import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button, Container } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useLocation } from "react-router-dom";
import "../Styles/AddWorkoutStyle.css";

const AddWorkout = () => {
  const navigate = useNavigate();
  const [totalPages, setTotalPages] = useState(110);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(18);
  const [exerciseData, setExerciseData] = useState([]);
  const [displayedItems, setDisplayedItems] = useState([]);

  const [selectedWorkouts, setSelectedWorkouts] = useState([]);
  const [selectedPaperIds, setSelectedPaperIds] = useState([]);

  var listIds = [];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredItems = exerciseData.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const bodyPartId = query.get("state")
    ? JSON.parse(decodeURIComponent(query.get("state"))).id
    : null;

  const date = query.get("state")
    ? JSON.parse(decodeURIComponent(query.get("state"))).date
    : null;

  useEffect(() => {
    fetch(`http://localhost:5280/api/Exercise/GetByBodyPart?bodyPartId=${bodyPartId}`)
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

  const handleSubmit = async () => {
	try {
		const response = await fetch("/api/CustomWorkout/Create", {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify({
			userId: sessionStorage.getItem("id"),
			name: "hruski",
			date: date
		  }),
		});
		const data = await response.json();
		var workoutId = parseInt(data);
	  } catch (error) {
		console.error(error);
	  }

	  try {
		listIds = selectedPaperIds;
		const response = await fetch(`/api/CustomWorkout/AddExercises?idWorkout=${workoutId}`, {
		  method: "POST",
		  headers: {
			"Content-Type": "application/json",
		  },
		  body: JSON.stringify(
			listIds
		  ),
		});
		if(response.status === 200) {
      alert("Workout added successfully!");
			navigate("/workoutplan");

		}
		console.log("workout id: "+workoutId)
		console.log("userid : " + sessionStorage.getItem("id"));
		console.log(listIds)

	  } catch (error) {
		console.error(error);
	  }
  }


  const handleClick = (item) => {
    const state = {
      workoutName: item.name,
    };

    const workoutName = item.name;
    const paperId = item.id;

    if (selectedWorkouts.includes(workoutName)) {
      setSelectedWorkouts(
        selectedWorkouts.filter((name) => name !== workoutName)
      );
    } else {
      setSelectedWorkouts([...selectedWorkouts, workoutName]);
    }

    if (selectedPaperIds.includes(paperId)) {
      setSelectedPaperIds(selectedPaperIds.filter((id) => id !== paperId));
    } else {
      setSelectedPaperIds([...selectedPaperIds, paperId]);
    }

    //const urlEncodedState = encodeURIComponent(JSON.stringify(state));
    //navigate(`/workoutdetails?state=${urlEncodedState}`);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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
          <Box
            sx={{
              justifyContent: "center",
              display: "flex",
              width: "100%",
              m: 1,
              p: 1,
            }}
          >
            <Button
              type="submit"
              width="100"
			  onClick={handleSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              SUBMIT
            </Button>
          </Box>
          <div className="item-row" style={{ marginTop: "3vh" }}>
            {displayedItems.map((item) => {
              const workoutName = item.name;
              const isChecked = selectedWorkouts.includes(workoutName);
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
                    className="item-box"
                    style={{
                      backgroundColor: isChecked ? "orange" : "inherit",
                    }}
                    key={paperId}
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
