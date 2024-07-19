import axios from "axios";
import { api } from "./api";

interface Resource {
    email: string,
    password: string,
    token : string,
    success:boolean,
    status:number,
    data : null,
    message:string
    payload:{userToken:string}
}

export const loginUser = async (resourceData: Resource): Promise<Resource> => {
    try {
        const res = await api.post<Resource>('/login', resourceData);
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
            throw new Error('Failed to create resource.');
        } else {
            console.error('Non-Axios error:', error);
            throw new Error('An unexpected error occurred.');
        }
    }
};

export const createUser = async (resourceData: Resource): Promise<Resource> => {
    try {
      const response = await api.post<Resource>('/register', resourceData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        throw new Error('Failed to create resource.');
      } else {
        console.error('Non-Axios error:', error);
        throw new Error('An unexpected error occurred.');
      }
    }
  };

export const getResource = async (resourceId: string): Promise<Resource> => {
    try {
      const response = await api.get<Resource>(`/resources/${resourceId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        throw new Error('Failed to fetch resource.');
      } else {
        console.error('Non-Axios error:', error);
        throw new Error('An unexpected error occurred.');
      }
    }
  };
  
  
  
  export const updateResource = async (resourceId: string, resourceData: Partial<Resource>): Promise<Resource> => {
    try {
      const response = await api.put<Resource>(`/resources/${resourceId}`, resourceData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        throw new Error('Failed to update resource.');
      } else {
        console.error('Non-Axios error:', error);
        throw new Error('An unexpected error occurred.');
      }
    }
  };
  
  export const deleteResource = async (resourceId: string): Promise<void> => {
    try {
      await api.delete(`/resources/${resourceId}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        throw new Error('Failed to delete resource.');
      } else {
        console.error('Non-Axios error:', error);
        throw new Error('An unexpected error occurred.');
      }
    }
  };