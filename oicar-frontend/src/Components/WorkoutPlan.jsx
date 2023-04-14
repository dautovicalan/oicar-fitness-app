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
    { id: 1, name: 'Item 1', description: 'Description for item 1' },
    { id: 2, name: 'Item 2', description: 'Description for item 2' },
    { id: 3, name: 'Item 3', description: 'Description for item 3' }
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
              <div className="item-box">
                <h3>
                  Name:{item.name}
                </h3>
                <p>
                  ID:{item.id}
                </p>
                <p>
                  Description:{item.description}
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
