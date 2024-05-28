import { useState } from "react";
import validator from "validator";
import Axios from "./axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const useRegister = () => {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: user?.profile?.username || "",
    email: user?.profile?.email || "",
    passwordHash: user?.profile?.passwordHash || "",
    bio: user?.profile?.bio || "",
    profilePicture: user?.profile?.profilePicture || "",
  });

  const [clientErrors, setClientErrors] = useState(null);
  const [serverErrors, setServerErrors] = useState([]);

  const validation = () => {
    const errors = {};
    const arr = ["png", "jpeg"];

    if (!formData.username || formData.username.trim().length === 0) {
      errors.username = "username is required";
    }

    if (!formData.email || formData.email.trim().length === 0) {
      errors.email = "email is required";
    } else if (!validator.isEmail(formData.email)) {
      errors.email = "email should be valid format";
    }

    if (!formData.passwordHash || formData.passwordHash.trim().length === 0) {
      errors.passwordHash = "password is required";
    } else if (
      formData.passwordHash.length < 8 ||
      formData.passwordHash.length > 128
    ) {
      errors.passwordHash = "password should be 8 - 128 character length";
    }

    if (!formData.bio || formData.bio.trim().length === 0) {
      errors.bio = "bio is required";
    }

    if (
      !formData.profilePicture ||
      !formData.profilePicture.name ||
      formData.profilePicture.name.trim().length === 0
    ) {
      errors.profilePicture = "profile picture is required";
    } else if (!arr.includes(formData.profilePicture.name.split(".")[1])) {
      errors.profilePicture = "Only valid file format is png or jpeg";
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "profilePicture") {
      setFormData({ ...formData, profilePicture: e.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validation();

    if (Object.keys(errors).length == 0) {
      try {
        if (user.isLoggedIn) {
          console.log("put", user);
          const userResponse = await Axios.put(
            "/api/users/profile/",
            formData,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("update", userResponse);
          dispatch({ type: "UPDATE", payload: { profile: userResponse.data } });
          navigate("/profile");
        } else {
          const userResponse = await Axios.post(
            "/api/users/register",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          navigate("/signin");
        }
      } catch (err) {
        console.log(err);
        setServerErrors(err.response?.data?.errors);
        setClientErrors(null);
      }
    } else {
      setClientErrors(errors);
      setServerErrors([]);
    }
  };
  return { formData, handleChange, handleSubmit, clientErrors, serverErrors };
};
export default useRegister;
