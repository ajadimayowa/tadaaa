import axios from "axios";
import { api } from "./api";

interface Resource {
    email: string,
    password: string,
    username:string,
    token : string,
    success:boolean,
    status:number,
    data : {payload:null, userToken:string},
    message:string
    payload:{userToken:string}
    code : number
}

// interface Status {
//   message: string,
//   success: boolean,
//   status: number
// }

export const loginUser = async (resourceData: Resource): Promise<Resource> => {
    try {
        const res = await api.post<Resource>('/login', resourceData);
        return res.data;
    } catch (error:any) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response);
          // throw new Error('Failed to create resource.');
          return error.response?.data
           
        } else {
            console.error('Non-Axios error:', error);
            return error.response
            // throw new Error('An unexpected error occurred.');
        }
    }
};

export const createUser = async (resourceData: Resource): Promise<Resource> => {
    try {
      const response = await api.post<Resource>('/register', resourceData);
      return response.data;
    } catch (error:any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data);
        // throw new Error('Failed to create resource.');
        return error.response?.data
         
      } else {
          console.error('Non-Axios error:', error);
          return error.response
          // throw new Error('An unexpected error occurred.');
      }
  }
  };


  export const createNewService = async (resourceData: Partial<Resource>): Promise<Resource> => {
    try {
      const response = await api.post<Resource>(`/create-todo?userName=${resourceData.username}`, resourceData);
      return response.data;
    } catch (error:any) {
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

  export const getResource = async (resourceId: string): Promise<Resource> => {
    try {
      const response = await api.get<Resource>(`/resources/${resourceId}`);
      return response.data;
    } catch (error:any) {
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
  
  
  export const updateResource = async (resourceId: string, resourceData: Partial<Resource>): Promise<Resource> => {
    try {
      const response = await api.put<Resource>(`/resources/${resourceId}`, resourceData);
      return response.data;
    } catch (error:any) {
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
  
  export const deleteResource = async (resourceId: string): Promise<void> => {
    try {
      await api.delete(`/resources/${resourceId}`);
    } catch (error:any) {
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