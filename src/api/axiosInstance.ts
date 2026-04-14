import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;
const apiTimeout = import.meta.env.VITE_API_TIMEOUT;

const axiosInstance = axios.create({
	baseURL: apiUrl,
	timeout: Number(apiTimeout),
	headers: {
		"Content-Type": "application/json",
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
