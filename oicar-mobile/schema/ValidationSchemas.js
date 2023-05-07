import * as Yup from "yup";

export const userValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password repeat is required"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const aboutYouValidationSchema = Yup.object().shape({
  birthday: Yup.date().required("Birthday is required"),
  weight: Yup.number()
    .required("Weight is required")
    .positive("Weight must be positive number"),
  height: Yup.number()
    .required("Height is required")
    .positive("Height must be positive number"),
});

export const workoutValidationSchema = Yup.object().shape({
  workoutName: Yup.string().required("Workout name is required"),
  workoutSets: Yup.string().required("Workout sets is required"),
  workoutReps: Yup.string().required("Workout reps is required"),
  workoutWeight: Yup.string().required("Workout weight is required"),
});

export const addPRValidationSchema = Yup.object().shape({
  workoutDate: Yup.date().required("Workout date is required"),
  workoutName: Yup.string().required("Workout name is required"),
  workoutWeight: Yup.number().required("Workout weight is required"),
});

export const editExerciseValidationSchema = Yup.object().shape({
  sets: Yup.number()
    .required("Exercise sets is required")
    .positive("Exercise sets must be positive number"),
  repetition: Yup.number()
    .required("Exercise reps is required")
    .positive("Exercise reps must be positive number"),
  weight: Yup.number()
    .required("Exercise weight is required")
    .positive("Exercise weight must be positive number"),
});
