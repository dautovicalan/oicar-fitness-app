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
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const AddMeal = () => {
  const navigate = useNavigate();

  const meals = [
    { id: 1, name: "Spaghetti Bolognese" },
    { id: 2, name: "Chicken Stir Fry" },
    { id: 3, name: "Beef Tacos" },
    { id: 4, name: "Salmon with Lemon Butter" },
    { id: 5, name: "Vegetable Curry" },
    { id: 6, name: "BBQ Ribs" },
    { id: 7, name: "Pasta Alfredo" },
    { id: 8, name: "Mushroom Risotto" },
    { id: 9, name: "Honey Glazed Chicken" },
    { id: 10, name: "Greek Salad" },
    { id: 11, name: "Teriyaki Salmon" },
    { id: 12, name: "Egg Fried Rice" },
    { id: 13, name: "Caprese Sandwich" },
    { id: 14, name: "Beef Stroganoff" },
    { id: 15, name: "Chicken Caesar Salad" },
	{ id: 16, name: "Chicken" },
	{ id: 17, name: "Bread" },
	{ id: 18, name: "Salama" },
  ];

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [gram, setGram] = useState('');
  const [protein, setProtein] = useState('');

  const handleMealClick = async (event) => {
    var textField = document.getElementById("gram");
	var textField1 = document.getElementById("protein");

    var gramValue = textField.value;
	var proteinValue = textField1.value;

	navigate("/mealplan")

    // try {
    //   const response = await fetch("/api/Account/ChangePassword", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: userData.email,
    //       password: newPasswordValue,
    //     }),
    //   });
    //   if (response.status === 200) {
    //     alert("Success")
    //   } else {
    //     alert("Failed!")
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
  };

//   useEffect(() => {
//     fetch("http://localhost:5280/api/Exercise")
//       .then((response) => response.json())
//       .then((data) => {
//         setExerciseData(data);
//         setTotalPages(Math.ceil(data.length / itemsPerPage));
//       });
//   }, [itemsPerPage]);

//   useEffect(() => {
//     const filteredData = exerciseData.filter((item) =>
//       item.name.toLowerCase().includes(searchText.toLowerCase())
//     );
//     setDisplayedItems(filteredData.slice(startIndex, endIndex));
//   }, [exerciseData, searchText, startIndex, endIndex]);

  const handleClick = (item) => {
    const state = {
      item,
      workoutName: item.name
    };
  // otvoriti modal
  handleOpen();

  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  //const displayedItems = filteredItems.slice(startIndex, endIndex);

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
    setCurrentPage(1); // Reset current page when search text changes
  };

  const handleProteinChange = (event) => {
    const input = event.target.value;
    // Validate if the input is a number
    if (/^\d+$/.test(input)) {
      setProtein(input);
    }
  };

  const handleGramChange = (event) => {
    const input = event.target.value;
    // Validate if the input is a number
    if (/^\d+$/.test(input)) {
      setGram(input);
    }
  };

  return (
    <div>
		<Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Nutritional Value
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          name="Gram"
          label="Grams"
          type="text"
          id="gram"
          value={gram}
          onChange={handleGramChange}
          error={!/^\d+$/.test(gram)} // Show error if not a number
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="Protein"
          label="Proteins"
          type="text"
          id="protein"
          value={protein}
          onChange={handleProteinChange}
          error={!/^\d+$/.test(protein)} // Show error if not a number
        />
        <Button
          type="submit"
          fullWidth
          onClick={handleMealClick}
          variant="contained"
          disabled={!gram || !protein} // Disable the button if any field is empty
        >
          Submit
        </Button>
      </Container>
    </Modal>
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
            {/* <TextField
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
            /> */}
          </Box>
          <div className="item-row" style={{ marginTop: "3vh" }}>
            {meals.map((item) => {
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
        {/* <Pagination
          count={totalPages}
          color="primary"
          page={currentPage}
          onChange={handlePageChange}
        /> */}
      </Box>
    </div>
  );
};

export default AddMeal;
