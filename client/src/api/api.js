import axios from "axios";

export default axios.create({
  baseURL: "https://mern-soulmate.herokuapp.com/",
  // baseURL: "http://localhost:8000/",
});
