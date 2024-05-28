import React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { grey } from "@mui/material/colors";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <Container
        maxWidth="xl"
        sx={{
          bgcolor: grey[50],
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{ textDecoration: "none", color: "inherit", fontWeight: "600" }}
          >
            Blog
          </Typography>
          {/* <Button>Sign up</Button> */}
          <Box sx={{ display: "flex", gap: "12px" }}>
            <IconButton
              sx={{ color: "inherit" }}
              component={RouterLink}
              to="/profile"
            >
              <PermIdentityIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={RouterLink}
              to="/create-post"
            >
              create
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </div>
  );
};

export default Header;
