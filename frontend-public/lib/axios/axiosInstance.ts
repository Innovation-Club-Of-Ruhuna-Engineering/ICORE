import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL, 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // important for cookies
});


export default axiosInstance;