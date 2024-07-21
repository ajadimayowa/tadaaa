import axios from "axios";

let baseURL = import.meta.env.VITE_API_BASEURL
let enviroment = import.meta.env
let dev = import.meta.env.DEV
let prod = import.meta.env.PROD

if(dev){
    baseURL = import.meta.env.VITE_API_BASEURL_LOCAL
}

export const api = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const checkEnv = ()=>{
    console.log({runing :baseURL})
    console.log({using:enviroment})
    console.log({dev:dev,prod:prod})
}

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