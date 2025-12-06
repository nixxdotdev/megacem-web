import axios from "axios";

export const baseURL = "http://localhost:5000";


const API = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

export default API