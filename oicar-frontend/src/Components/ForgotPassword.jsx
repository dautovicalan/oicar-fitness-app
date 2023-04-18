import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

const theme = createTheme();

const RecoverAccountSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
});

const RecoverAccount = (props) => {
	const initialValues = { email: "" };

	const handleSubmit = (values) => {
		console.log(values);
	};

	return (
		<>
			<ThemeProvider theme={theme}>
				<Box sx={{ height: "77vh" }}>
					<Container component="main" maxWidth="xs">
						<CssBaseline />

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
								Recover account
							</Typography>
							<Formik
								initialValues={initialValues}
								validationSchema={RecoverAccountSchema}
								onSubmit={handleSubmit}
							>
								{(formik) => (
									<Box sx={{ minWidth: "45vh" }}>
										<Form noValidate onSubmit={formik.handleSubmit}>
											<Field
												as={TextField}
												margin="normal"
												required
												fullWidth
												id="email"
												label="Email Address"
												name="email"
												autoComplete="email"
												autoFocus
											/>
											<ErrorMessage name="email">
												{(msg) => <p style={{ color: "red" }}>{msg}</p>}
											</ErrorMessage>
											<Button
												type="submit"
												fullWidth
												variant="contained"
												sx={{ mt: 3, mb: 2 }}
												disabled={!formik.isValid}
											>
												Send recovery link
											</Button>
											<Grid container>
												<Grid item>
													<Link href="/login" variant="body2">
														{"Back to login"}
													</Link>
												</Grid>
											</Grid>
										</Form>
									</Box>
								)}
							</Formik>
						</Box>
					</Container>
				</Box>
			</ThemeProvider>
		</>
	);
};

export default RecoverAccount;
