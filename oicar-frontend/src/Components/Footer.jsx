import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      style={{ marginTop: "100px" }}
      sx={{
        backgroundColor: "#f7f7f7",
        py: 4,
        borderTop: "1px solid #e0e0e0",
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center" spacing={2}>
          <Grid item>
            <Typography variant="h4" component="h2" sx={{ color: "#333", fontWeight: "bold" }}>
              FitPal
            </Typography>
          </Grid>
        </Grid>
        <Box mt={2} textAlign="center">
          <Typography variant="body2" sx={{ color: "#888", mt: 1 }}>
          <Typography variant="body2" sx={{ color: "#888" }}>
            &copy; {new Date().getFullYear()} FitPal. All Rights Reserved.
          </Typography>
            <Link to="/useragreement" style={{ color: "#888" }}>
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link to="/useragreement" style={{ color: "#888" }}>
              Social Network
            </Link>{" "}
            |{" "}
            <Link to="/useragreement" style={{ color: "#888" }}>
              Terms of Service
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
