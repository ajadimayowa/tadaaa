import axios from "axios";


export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASEURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

let token: string | null = null;

api.interceptors.request.use(
    config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export const setToken = (newToken: string) => {
    token = newToken;
};