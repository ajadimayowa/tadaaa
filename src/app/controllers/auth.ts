import axios, { AxiosDefaults, AxiosError } from "axios";
import api from "./api";

interface Resource {
  email: string,
  password: string,
  username: string,
  token: string,
  success: boolean,
  status: number,
  data: { payload: null, userToken: string },
  message: string
  payload: { userToken: string }
  code: number
}

interface IPromsie {
  data: {payload:object,userToken:string},
  status: number,
  statusText: string,
  message:string,
  success:boolean

  // `headers` the HTTP headers that the server responded with
  // All header names are lower cased and can be accessed using the bracket notation.
  // Example: `response.headers['content-type']`
  // headers: {},

  // `config` is the config that was provided to `axios` for the request
  // config: {},

  // `request` is the request that generated this response
  // It is the last ClientRequest instance in node.js (in redirects)
  // and an XMLHttpRequest instance in the browser
  // request: {}
}

interface IPost {
  url:string,
  body:object,
  token?:string,
  success:boolean
}

export const loginUser = async (resourceData: Resource): Promise<IPromsie> => {
  try {
    const res = await api.post('/login', resourceData);
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

export const createUser = async (resourceData: Resource): Promise<IPromsie> => {
  try {
    const response = await api.post('/register', resourceData);
    return response.data;
  } catch (error: any) {
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

const verifyUser = async (resourceData: IPost): Promise<IPromsie> => {
  try {
    const response = await api.post(resourceData.url,resourceData.body);
    return response.data;
  } catch (error: any) {
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

export const getResource = async (resourceId: string): Promise<Resource> => {
  try {
    const response = await api.get<Resource>(`/resources/${resourceId}`);
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


export const updateResource = async (resourceId: string, resourceData: Partial<Resource>): Promise<Resource> => {
  try {
    const response = await api.put<Resource>(`/resources/${resourceId}`, resourceData);
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

export const deleteResource = async (resourceId: string): Promise<void> => {
  try {
    await api.delete(`/resources/${resourceId}`);
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

export { verifyUser }