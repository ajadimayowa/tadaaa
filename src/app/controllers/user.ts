import api from "./api";
import axios from "axios";
interface IPromsie {
    data: {payload:object,userToken:string},
    status: number,
    statusText: string,
    message:string,
    success:boolean
  }

export const getUserGigs = async (resourceData:any): Promise<IPromsie> => {
    try {
      const res = await api.get('/', resourceData);
      return res.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response);
        // throw new Error('Failed to create resource.');
        return error.response?.data
  
      } else {
        console.error('Non-Axios error:', error);
        console.log('error here :', error.response)
        return error.response.data
  
        // throw new Error('An unexpected error occurred.');
      }
    }
  };

  export const doUserKyc = async (resourceData: any): Promise<IPromsie> => {
    try {
      const response = await api.post<IPromsie>(`/update-user?userId=${resourceData.userId}`, resourceData);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        // throw new Error('Failed to create resource.');
        return error.response?.data
  
      } else {
        console.error('Non-Axios error:', error);
        return error.response?.data
        // throw new Error('An unexpected error occurred.');
      }
    }
  };