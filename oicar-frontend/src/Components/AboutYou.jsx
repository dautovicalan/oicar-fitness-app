import * as React from "react";
import { styled } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import CssBaseline from "@mui/material/CssBaseline";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import NativeSelect from "@mui/material/NativeSelect";
import InputBase from "@mui/material/InputBase";
import { Button, Container } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

const validationSchema = yup.object().shape({
	height: yup
		.number("Height must be a number")
		.required("Height is required")
		.positive("Height must be greater than 0 cm")
		.min(60, "Height must be greater than 60 cm")
		.max(250, "Height must be less than 250 cm"),
	weight: yup
		.number("Weight must be a number")
		.required("Weight is required")
		.positive("Weight must be greater than 0 kg")
		.min(20, "Weight must be greater than 20 kg")
		.max(300, "Weight must be less than or equal to 300 kg"),
	age: yup
		.number("Age must be a number")
		.required("Age is required")
		.positive("Age must be greater than 0")
		.min(18, "You must be at least 18 years old")
		.max(120, "You must be less than 120 years old"),
});

const AboutYou = ({handleNext}) => {
	const BootstrapInput = styled(InputBase)(({ theme }) => ({
		"label + &": {
			marginTop: theme.spacing(3),
		},
		"& .MuiInputBase-input": {
			borderRadius: 4,
			position: "relative",
			backgroundColor: theme.palette.background.paper,
			border: "1px solid #ced4da",
			fontSize: 16,
			padding: "10px 26px 10px 12px",
			transition: theme.transitions.create(["border-color", "box-shadow"]),
			// Use the system font instead of the default Roboto font.
			fontFamily: [
				"-apple-system",
				"BlinkMacSystemFont",
				'"Segoe UI"',
				"Roboto",
				'"Helvetica Neue"',
				"Arial",
				"sans-serif",
				'"Apple Color Emoji"',
				'"Segoe UI Emoji"',
				'"Segoe UI Symbol"',
			].join(","),
			"&:focus": {
				borderRadius: 4,
				borderColor: "#80bdff",
				boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
			},
		},
	}));

	const [age, setAge] = React.useState("");
	const handleChange = (event) => setAge(event.target.value);

	const formik = useFormik({
		initialValues: {
			height: "",
			weight: "",
			age: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {

		},
	});

	const handleSubmit = (event) => {
		const data = new FormData(event.currentTarget);
		console.log({
		  email: data.get("height"),
		  password: data.get("weight"),
		  password: data.get("age"),
		});
		handleNext()
	  };

	return (
		<div>
			<Container
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
					<h3>About You</h3>
					<Box>
						<TextField
							margin="normal"
							required
							fullWidth
							id="height"
							name="height"
							label="Height (cm)"
							type="number"
							value={formik.values.height}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.height && Boolean(formik.errors.height)}
							helperText={formik.touched.height && formik.errors.height}
						/>
					</Box>
					<Box>
						<TextField
							margin="normal"
							required
							fullWidth
							id="weight"
							name="weight"
							label="Weight (kg)"
							type="number"
							value={formik.values.weight}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.weight && Boolean(formik.errors.weight)}
							helperText={formik.touched.weight && formik.errors.weight}
						/>
					</Box>
					<Box>
						<TextField
							margin="normal"
							required
							fullWidth
							id="age"
							name="age"
							label="Age"
							type="number"
							value={formik.values.age}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.age && Boolean(formik.errors.age)}
							helperText={formik.touched.age && formik.errors.age}
						/>
					</Box>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={!formik.isValid || formik.isSubmitting}
					>
						{formik.isSubmitting ? "Submitting..." : "Next"}
					</Button>
				</Box>
			</Container>
		</div>
	);
};

export default AboutYou;
