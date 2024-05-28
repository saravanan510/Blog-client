import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "./axios";
import { useNavigate } from "react-router-dom";

const usePost = (id) => {
  const [editData, setEditData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const editPost = await Axios.get(`/api/posts/${id}`, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          });
          setEditData(editPost.data);
        } catch (error) {
          console.log("Error fetching post:", error);
        }
      })();
    }
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      tags: [],
      featuredImage: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Required"),
      content: Yup.string().required("Required"),
      tags: Yup.array().required("Required"),
      featuredImage: Yup.mixed()
        .required("Required")
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) => value && ["image/jpeg", "image/png"].includes(value.type)
        ),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      console.log("values", values);
      try {
        let postResponse = "";
        if (id) {
          console.log("values", values);
          const response = await Axios.put(`/api/posts/${id}`, values, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          });
          postResponse = response;

          navigate("/");
        } else {
          const response = await Axios.post("/api/posts", values, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: localStorage.getItem("token"),
            },
          });
          postResponse = response;
          navigate("/");
        }

        if (postResponse.data) {
          try {
            const updateTags = await Axios.put("/api/tags", postResponse.data);
            console.log(updateTags);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    formik.setValues({
      ...editData,
    });
  }, [editData]);

  return { formik };
};

export default usePost;
