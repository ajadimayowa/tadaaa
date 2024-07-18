import axios, {AxiosRequestConfig} from "axios";
import { IUserRegForm } from "../interfaces/user";

const baseUrl = import.meta.env.VITE_API_BASEURL


const config :AxiosRequestConfig = {
    headers: {
        // Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        // Add other headers if needed
    }
}


export default {
    post: async (url: string, body: IUserRegForm) => {
        try {
           const res = await axios.post(`${baseUrl}${url}`, body,config);
           return(res)
        } catch (error) {
            return(error)
        }
    }

}