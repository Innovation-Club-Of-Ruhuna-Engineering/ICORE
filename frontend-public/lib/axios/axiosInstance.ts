import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEST_BACKEND_URL, // get from .env
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


export default axiosInstance;