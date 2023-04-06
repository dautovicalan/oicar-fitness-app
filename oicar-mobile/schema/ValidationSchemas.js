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
