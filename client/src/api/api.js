import axios from "axios";

export default axios.create({
  baseURL: "https://mern-yarn.onrender.com/",
  // baseURL: "https://mern-soulmate.herokuapp.com/",
  // baseURL: "http://localhost:8000/",
});
