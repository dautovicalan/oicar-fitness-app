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
  const [workoutID, setWorkoutID] = useState(null);
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


  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   console.log(selectedDate)
    
  //     const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
  //     const year = dateObj.getFullYear();
  //     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  //     const day = String(dateObj.getDate()).padStart(2, "0");
  //     const formattedDate = `${year}-${month}-${day}`;
    
  //     //console.log("trenutni datum: "+ formattedDate);
    
  //     fetch(`http://localhost:5280/api/CustomWorkout/ByDate?idUser=${userID}&date=${formattedDate}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw new Error("Invalid call"); // Throw an error for 404 response
  //         }
  //         return response.json();
  //       })
  //       .then((data) => {
  //         setMyList(data);
  //         copyList.push(data);
  //         console.log(copyList);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         alert("Invalid call"); // Display an alert for the error
  //       });
  // };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
  };

  useEffect(() => {
    if (selectedDate !== null) {
      const dateObj = new Date(selectedDate); // Convert selectedDate to a Date object
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0");
      const day = String(dateObj.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
  
      fetch(`http://localhost:5280/api/CustomWorkout/ByDate?idUser=${userID}&date=${formattedDate}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid call"); // Throw an error for 404 response
          }
          return response.json();
        })
        .then((data) => {
          //setMyList(data);
          setWorkoutID(data.id)
          console.log(workoutID)
          //setCopyList([...copyList, data]);
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid call"); // Display an alert for the error
        });


        fetch(`http://localhost:5280/api/CustomWorkout/GetWorkout?idUser=${userID}&idWorkout=${workoutID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Invalid call"); // Throw an error for 404 response
          }
          return response.json();
        })
        .then((data) => {
         
          setCopyList([...copyList, data]);
          console.log(copyList);
        })
        .catch((error) => {
          console.error(error);
          alert("Invalid call"); // Display an alert for the error
        });
    }
  }, [selectedDate, userID]);

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
              }}
            />
          </LocalizationProvider>

          <Button
            onClick={handleDateClick}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, width: "50%" }}
          >
            Add a workout
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
            {copyList.map((item) => {
              return (
                <div key={item.id} className="item">
                  <Paper className="item-box" onClick={() => handleClick(item)}>
                    <h3>{item.workoutName}</h3>
                    <p>Sets: {item.sets}</p>
                    <p>Reps: {item.reps}</p>
                    <p>Weight: {item.weight} kg</p>
                  </Paper>
                </div>
              );
            })}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default WorkoutPlan;
