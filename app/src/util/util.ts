import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/v1/'; 

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
});

export default axiosInstance;
