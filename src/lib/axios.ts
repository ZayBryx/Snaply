// lib/axios.js
import axios from "axios";

// Set global defaults directly on the Axios default instance
axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

axios.defaults.headers.common["Content-Type"] = "application/json";

// You can also set other defaults like timeout, auth, etc.
axios.defaults.timeout = 10000;

export default axios;
