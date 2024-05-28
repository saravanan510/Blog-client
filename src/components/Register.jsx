import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import useRegister from "../utils/useRegister";
import { Link as RouterLink } from "react-router-dom";
import { Alert, AlertTitle } from "@mui/material";

const Register = () => {
  const { formData, handleChange, handleSubmit, clientErrors, serverErrors } =
    useRegister();

  const displayError = () => {
    if (Array.isArray(serverErrors)) {
      return serverErrors.map((err) => {
        return (
          <div style={{ width: "100%", marginTop: "24px" }}>
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              {err.msg}
            </Alert>
          </div>
        );
      });
    } else if (typeof serverErrors == "string") {
      return (
        <div style={{ width: "100%", marginTop: "24px" }}>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {serverErrors}
          </Alert>
        </div>
      );
    }
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
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
          {serverErrors && displayError()}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="username"
                  name="username"
                  fullWidth
                  id="username"
                  label="Username"
                  autoFocus
                  value={formData.username}
                  onChange={handleChange}
                  error={clientErrors?.username}
                  helperText={clientErrors?.username}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={clientErrors?.email}
                  helperText={clientErrors?.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="passwordHash"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formData.passwordHash}
                  onChange={handleChange}
                  error={clientErrors?.passwordHash}
                  helperText={clientErrors?.passwordHash}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  fullWidth
                  name="bio"
                  label="Bio"
                  id="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  error={clientErrors?.bio}
                  helperText={clientErrors?.bio}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="profilePicture"
                  type="file"
                  id="profilePicture"
                  onChange={handleChange}
                  error={clientErrors?.profilePicture}
                  helperText={clientErrors?.profilePicture}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link variant="body2">
                  <RouterLink to="/signin">
                    Already have an account? Sign in
                  </RouterLink>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 5 }} /> */}
      </Container>
    </div>
  );
};

export default Register;
