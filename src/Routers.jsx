import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import CreatePost from "./components/CreatePost";
import PrivateRoute from "./utils/PrivateRoute";
import Profile from "./components/Profile";
import SinglePost from "./components/SinglePost";
import EditPost from "./components/EditPost";

const Routers = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/signin" element={<Login />} />
      <Route path="/" element={<Layout />}>
        {/* <Route index element={<Home />} /> */}
        <Route
          index
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <PrivateRoute>
              <EditPost />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <PrivateRoute>
              <SinglePost />
            </PrivateRoute>
          }
        />
      </Route>
    </Routes>
  );
};

export default Routers;
