import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import Box from "@mui/material/Box";
import '../Styles/WorkoutPlanStyle.css'
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const WorkoutPlan = () => {

  const myList = [
    { id: 1, name: 'Bench press', sets: 3, reps: 3, weight: 100 },
    { id: 2, name: 'Curls', sets: 2, reps: 5, weight: 15 },
    { id: 3, name: 'Rows', sets: 4, reps: 7, weight: 20 }
  ];

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            m: 1,
            p: 1,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
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
          {myList.map((item) =>  {
            return (
              <div className="item-box" key={item.id}>
                <h3>
                  Name:{item.name}
                </h3>
                <p>
                  Sets:{item.sets}
                </p>
                <p>
                  Reps:{item.reps}
                </p>
                <p>
                  Weight:{item.weight} kg
                </p>
              </div>
            )
          })}
        </Box>
      </div>
    </div>
  );
};

export default WorkoutPlan;
