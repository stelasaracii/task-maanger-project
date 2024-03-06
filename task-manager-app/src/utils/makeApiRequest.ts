import axios, { Method } from "axios";
import { BASE_URL } from "../store/constants";

export const makeApiRequest = async (method: Method, url: string, data:any = null) => {
    const token = localStorage.getItem('token');
    const config = {
      method,
      url: `${BASE_URL}${url}`,
      headers: { Authorization: `Bearer ${token}` },
      data,
    };
    try {
      const response = await axios(config);
      return response.data;
    } catch (error) {
      console.error(`Error with ${method} request to ${url}:`, error);
      throw error; 
    }
  };