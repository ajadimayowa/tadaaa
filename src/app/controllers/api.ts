import axios from 'axios';

let baseURL = import.meta.env.VITE_API_BASEURL
let dev = import.meta.env.DEV


if (dev) {
    baseURL = import.meta.env.VITE_API_BASEURL_LOCAL
}

// console.log({ currentDev: dev })
// console.log({ currentEnv: baseURL })

const api = axios.create({
    baseURL: `${baseURL}/api/`, // replace with your API base URL
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

export default api;