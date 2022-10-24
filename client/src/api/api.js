import axios from "axios";

export default axios.create({
  // baseURL: "https://mern-yarn.onrender.com/",
  // baseURL: "http://server-dev222.us-west-2.elasticbeanstalk.com/",
  baseURL: "http://localhost:8000/",
});
