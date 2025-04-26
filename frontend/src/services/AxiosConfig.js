import axios from 'axios';
import { AuthService } from './AuthService';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(async (config) => {
    const headers = await AuthService.getAuthHeaders();
    config.headers = { ...config.headers, ...headers };
    return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
