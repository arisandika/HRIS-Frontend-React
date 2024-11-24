import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // set default endpoint API
});

export default api;
