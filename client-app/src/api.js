import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5003/api', // Ensure this matches your backend URL
  withCredentials: true, // If you need to send cookies or auth headers
});

export default api;