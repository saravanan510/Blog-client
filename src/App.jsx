import React, { useEffect, useState } from "react";
import Routers from "./Routers";
import { useAuth } from "./context/AuthContext";
import Axios from "./utils/axios";

function App() {
  const { user, dispatch } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      (async () => {
        const userResponse = await Axios.get("/api/users/profile", {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        dispatch({ type: "LOGIN", payload: { profile: userResponse.data } });
      })();
    }
  }, []);

  return <Routers />;
}

export default App;
