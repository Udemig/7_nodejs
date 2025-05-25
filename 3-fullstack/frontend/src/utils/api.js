import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4080"
})

export default api;