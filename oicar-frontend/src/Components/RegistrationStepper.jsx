import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AboutYou from "./AboutYou";
import WhatsYourGoal from "./WhatsYourGoal";
import RegistrationForm from "./RegistrationForm";

const steps = ["Registration", "About you", "Whats your goal?"];

// Get data from session storage
const userID = sessionStorage.getItem("id");

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(() => {
    if (userID == null) {
      return 0;
    } else {
      return 1;
    }
  });

  const handleUserPreferences = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/UserPreferences/Register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          height: formValues.firstName,
          weight: formValues.lastName,
          goal: formValues.email,
          workoutNumberPerWeek: formValues.password,
          userId: formValues.newsletter 
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
  
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === 0 && (
        <RegistrationForm handleBack={handleBack} handleNext={handleNext} />
      )}
      {activeStep === 1 && (
        <AboutYou handleBack={handleBack} handleNext={handleNext} />
      )}
      {activeStep === 2 && (
        <WhatsYourGoal handleBack={handleBack} handleNext={handleNext} />
      )}
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
