import axios from "axios";
import { BASE_URL } from "./constants";

export async function fetchTasks() {
  try {
    const response = await axios.get(BASE_URL + "/protected/tasks", {
      // withCredentials: true,
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};
