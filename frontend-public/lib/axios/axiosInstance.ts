import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // your NestJS backend URL
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // important for cookies
});


export default axiosInstance;