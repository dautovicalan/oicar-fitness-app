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

const WorkoutPlan = () => {
  const [myList, setMyList] = useState({});
  const [copyList, setCopyList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [workoutID, setWorkoutID] = useState(0);
  const [workoutExists, setWorkoutExists] = useState(true);
  const [dateClicked, setDateClicked] = useState(false);
  const userID = sessionStorage.getItem("id");
  const navigate = useNavigate();

  const handleClick = (item) => {
    const state = {
      item,
      workoutName: item.workoutName,
      sets: item.sets,
      reps: item.reps,
      weight: item.weight,
    };
    const urlEncodedState = encodeURIComponent(JSON.stringify(state));
    navigate(`/workoutdetails?state=${urlEncodedState}`);
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
      const formattedDate = `${year}-${month}-${day}`;

      fetch(
        `http://localhost:5280/api/CustomWorkout/ByDate?idUser=${userID}&date=${formattedDate}`,
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
              value={selectedDate}
              onChange={handleDateChange}
              //renderInput={(props) => <input {...props} />}
              sx={{
                width: "80%",
                height: "600px",
                "& .MuiPickersDay-root": {
                  "&:hover": {
                    backgroundColor: "orange",
                    color: "black"
                  },
                },
              }}
            />
          </LocalizationProvider>

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
            Add a workout
          </Button>
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
            Delete
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
          <div className="item-row">
            {workoutExists && copyList.length > 0 ? (
              copyList[0].map((item) => (
                <div key={item.id} className="item">
                  <Paper className="item-box">
                    <h3>{item.name}</h3>
                    <Button
                      onClick={() => handleClick(item)}
                      width="100"
                      variant="contained"
                      sx={{ mt: 3, mb: 2, width: "50%", backgroundColor:"black","&:hover": {
                backgroundColor: "orange",
                color: "black",
              }, }}
                    >
                      Details
                    </Button>
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
                  textDecoration: "bold",
                  fontSize: "10vh",
                }}
              >
                No workouts found for this day.
              </div>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default WorkoutPlan;
