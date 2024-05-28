import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Box, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import { useAuth } from "../context/AuthContext";
import useRegister from "../utils/useRegister";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
const Profile = () => {
  const { formData, handleChange, handleSubmit, clientErrors, serverErrors } =
    useRegister();
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Container
      sx={{
        padding: "36px 0px",
      }}
    >
      <Grid container spacing={2} justifyContent="center">
        <Grid
          item
          xs={8}
          sx={{
            marginBottom: "36px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <Box
              component="img"
              sx={{
                height: 120,
                width: 120,
                marginBottom: "24px",
                borderRadius: "50%",
              }}
              alt="The house from the offer."
              src={`http://localhost:6109/public/images/${user.profile.profilePicture}`}
            />
            <Box sx={{ display: "flex", gap: "12px" }}>
              <Button
                variant="contained"
                onClick={handleOpen}
                sx={{
                  marginTop: "20px",
                }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  dispatch({ type: "LOGOUT" });
                  navigate("/signin");
                }}
                sx={{
                  marginTop: "20px",
                  color: "red",
                }}
              >
                Logout
              </Button>
            </Box>
          </Box>

          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {user.profile.username}
            </Typography>
            <Typography>{user.profile.email}</Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            Bio
          </Typography>
          <Typography>{user.profile.bio}</Typography>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            sx={{ fontWeight: 600, marginBottom: "12px" }}
            variant="h6"
          >
            Edit Profile
          </Typography>
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
                {/* <TextField
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
              /> */}
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
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default Profile;
