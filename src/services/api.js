import axios from "axios";

const api = axios.create({
 baseURL: "https://travelexplorerb-2.onrender.com/"
});

export default api;