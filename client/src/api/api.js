import axios from "axios";

export default axios.create({
  // baseURL: "https://data.mongodb-api.com/app/data-xlouf/endpoint/data/v1/",
  // baseURL: "https://mern-soulmate.herokuapp.com/",
  baseURL: "http://localhost:8000/",
});
