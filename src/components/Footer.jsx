import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: grey[100],
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
