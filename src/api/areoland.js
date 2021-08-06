import axios from "axios";

let baseURL = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:5000";
} else {
  baseURL = "https://api-dot-areoland.appspot.com";
}

const API = axios.create({
  baseURL: baseURL,
});

export default API;
