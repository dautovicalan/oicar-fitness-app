import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CssBaseline from "@mui/material/CssBaseline";
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import TextField from '@mui/material/TextField';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import { Button, Container } from '@mui/material';



const AboutYou = () => {
    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        'label + &': {
          marginTop: theme.spacing(3),
        },
        '& .MuiInputBase-input': {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.background.paper,
          border: '1px solid #ced4da',
          fontSize: 16,
          padding: '10px 26px 10px 12px',
          transition: theme.transitions.create(['border-color', 'box-shadow']),
          // Use the system font instead of the default Roboto font.
          fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(','),
          '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
          },
        },
      }));

      const [age, setAge] = React.useState('');
      const handleChange = (event) => setAge(event.target.value);
      
  return (
    <div>
      <Container              
      sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",}} >
        <h3>About You</h3>
        <Box>
        <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="height"
                  label="Height"
                  name="height"
                  autoFocus
                />
        </Box>
        <Box>
        <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="weight"
                  label="Weight"
                  name="weight"
                  autoFocus
                />
        </Box>
        <Box>
        <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="age"
                  label="Age"
                  name="age"
                  autoFocus
                />
        </Box>
      </Container>
    </div>
  )
}

export default AboutYou;