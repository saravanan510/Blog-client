import axios from "axios";
const Axios = axios.create({
  // baseURL: "http://localhost:6109",
  baseURL: "https://blog-server-karj.onrender.com",
});

export default Axios;
