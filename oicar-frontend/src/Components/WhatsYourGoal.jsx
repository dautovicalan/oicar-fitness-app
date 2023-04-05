import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';

export const fitnessGoals = Array.of(
    { id: 1, text: "Be More Active" },
    { id: 2, text: "Lose Weight" },
    { id: 3, text: "Stay Toned" },
    { id: 4, text: "Build Muscle" },
    { id: 5, text: "Reduce Stress" }
  );
  
  export const workoutsPerWeek = Array.of(
    { id: 2, text: "2 - 3" },
    { id: 3, text: "3 - 4" },
    { id: 4, text: "4 - 5" },
    { id: 5, text: "5+" }
  );

const WhatsYourGoal = () => {
    return (
    <div>
     <Container              
      sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",}} >

    <FormControl sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="demo-simple-select-helper-label">Fitness goal</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Goal"
      >
        {
            fitnessGoals.map(goal=>
            <MenuItem key={goal.id} value={goal.id}>{goal.text}</MenuItem>
        )}

      </Select>
      <FormHelperText>What is your fitness goal?</FormHelperText>
    </FormControl>

    <FormControl sx={{ m: 1, minWidth: 300 }}>
      <InputLabel id="demo-simple-select-helper-label">Workout goal</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        label="Workout"
      >
        {
            workoutsPerWeek.map(workout=>
            <MenuItem key={workout.id} value={workout.id}>{workout.text}</MenuItem>
        )}

      </Select>
      <FormHelperText>How many workouts per week?</FormHelperText>
    </FormControl>
    </Container>
  </div>
  )
}

export default WhatsYourGoal