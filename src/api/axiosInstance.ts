import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://raw.githubusercontent.com/nabilunnuha/portofolio-data/main',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.message);
    return Promise.reject(error);
  },
);

export default axiosInstance;
