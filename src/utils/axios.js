import axios from "axios";
const Axios = axios.create({
  // baseURL: "http://localhost:6109",
  baseURL: "https://blog-app-server-sooty.vercel.app/",
});

export default Axios;
