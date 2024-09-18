import axios from 'axios';
import { AxiosRequestConfig } from 'axios';

const BACKEND_API_URL = import.meta.env.VITE_API_URL;
console.log(BACKEND_API_URL);

export const axiosClient = axios.create({ baseURL: BACKEND_API_URL });
export const config: AxiosRequestConfig = { withCredentials: true };

