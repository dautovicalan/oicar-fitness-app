import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AboutYou from "./AboutYou";
import { useState, useEffect } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import RegistrationStepper from "./RegistrationStepper";
import WhatsYourGoal from "./WhatsYourGoal";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        FitPal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
var errorsTemp = {};
const theme = createTheme();

export default function SignUp({handleNext}) {
  const initialValues = { email: "", password: "", repeatpassword: "", firstName: "", lastName: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/Account/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          password: formValues.password,
        }),
      });
      const data = await response.json();
      if (data.isRegister) {
        window.location.href = "/workoutplan"
        localStorage.setItem("id", data.id);
        sessionStorage.setItem("id", data.id);


      } else if (data == null) {
        return false;
      } else if(data.isRegister == false) {
        window.location.href = "/register"
        localStorage.setItem("id", data.id);
        sessionStorage.setItem("id", data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(formValues));
    setIsSubmit(true);
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
      
    });
    //console.log(Object.keys(errorsTemp).length);
    
    if (Object.keys(errorsTemp).length == 0) {
      handleNext()
    }
    
  };

  useEffect(() => {
    console.log(errors);
    if (Object.keys(errors).length == 0 && isSubmit) {
      console.log(formValues);
    }
  }, [errors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!values.firstName) {
      errors.firstName = "First Name is required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    if (!values.repeatpassword) {
      errors.repeatpassword = "Repeat Password is required!";
    } else if (values.repeatpassword!=values.password) {
      errors.repeatpassword = "Passwords must match!";
    }
    errorsTemp = errors;
    return errors;
  };

  return (
    <>

      <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      <pre>{JSON.stringify(errors, undefined, 2)}</pre>

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box sx={{ height: "77vh" }}>
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      value={formValues.firstName}
                      onChange={handleChange}
                    />
                    <p style={{ color: "red" }}>{errors.firstName}</p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      value={formValues.lastName}
                      onChange={handleChange}
                    />
                    <p style={{ color: "red" }}>{errors.lastName}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={formValues.email}
                      onChange={handleChange}
                    />
                    <p style={{ color: "red" }}>{errors.email}</p>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={formValues.password}
                      onChange={handleChange}
                    />
                    <p style={{ color: "red" }}>{errors.password}</p>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="repeatpassword"
                      label="Repeat Password"
                      type="password"
                      id="repeatpassword"
                      value={formValues.repeatpassword}
                      onChange={handleChange}
                    />
                    <p style={{ color: "red" }}>{errors.repeatpassword}</p>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  onClick={handleRegistration}
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  NEXT
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  
                  sx={{ mt: 3, mb: 2, backgroundColor:'gray' }}
                >
                  Continue with Google <GoogleIcon id="google-icon"/>
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/login" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    

    </>
  );
}
