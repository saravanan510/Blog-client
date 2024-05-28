import React from "react";
import { useAuth } from "../context/AuthContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import Axios from "./axios";
import { useNavigate } from "react-router-dom";
const useLogin = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .max(15, "Maximum 128 characters or less")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const tokenResponse = await Axios.post("/api/users/login", values);
        localStorage.setItem("token", tokenResponse.data.token);
        const userResponse = await Axios.get("/api/users/profile", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(userResponse);
        dispatch({ type: "LOGIN", payload: { profile: userResponse.data } });
        navigate("/");
      } catch (err) {
        setErrors({ serverError: err.response?.data.errors });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return formik;
};

export default useLogin;
