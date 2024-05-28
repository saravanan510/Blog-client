import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TextEditor from "./TextEditor";
import Button from "@mui/material/Button";
import usePost from "../utils/usePost";
import Axios from "../utils/axios";
import Select from "react-select";
import { useParams } from "react-router-dom";
const EditPost = () => {
  const { id } = useParams();
  const { formik } = usePost(id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await Axios.get("/api/tags/");
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTags();
  }, []); // Ensure this effect runs only once on mount

  const options = categories.map((tag) => ({
    value: tag._id,
    label: tag.name,
  }));
  return (
    <div>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          padding: "24px",
        }}
      >
        <Box>
          <Typography
            component="h1"
            variant="h6"
            sx={{
              marginBottom: "16px",
            }}
          >
            Create Post
          </Typography>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="featuredImage"
                  name="featuredImage"
                  type="file"
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched?.featuredImage &&
                    Boolean(formik.errors.featuredImage)
                  }
                  helperText={formik.errors?.featuredImage}
                  onChange={(event) => {
                    formik.setFieldValue(
                      "featuredImage",
                      event.currentTarget.files[0]
                    );
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="title"
                  label="Title"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  error={formik.touched?.title && Boolean(formik.errors.title)}
                  helperText={formik.errors?.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextEditor formik={formik} />
              </Grid>
              <Grid item xs={12}>
                <Select
                  isMulti
                  name="tags"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={(selectedOptions) => {
                    formik.setFieldValue(
                      "tags",
                      selectedOptions.map((option) => option.value)
                    );
                  }}
                  onBlur={() => formik.setFieldTouched("tags", true)}
                />
                {formik.touched.tags && formik.errors.tags ? (
                  <div style={{ color: "red" }}>{formik.errors.tags}</div>
                ) : null}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {id ? "update" : "create"}
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default EditPost;
