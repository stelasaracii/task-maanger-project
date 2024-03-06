import axios from "axios";
import { Task } from "../typings/Task";
import { ADD_TASK, DELETE_TASKS, EDIT_TASK, SET_ALL_TASKS, SET_TASKS } from "./constants";

interface AddTaskAction {
  task: Task;
  type: typeof ADD_TASK;
}

interface EditTaskAction {
  task: Task;
  type: typeof EDIT_TASK;
}

interface DeleteTaskAction {
  deleteTaskId: number;
  type: typeof DELETE_TASKS;
}

interface SetTasksAction {
  tasks: Task[];
  type: typeof SET_TASKS;
}

interface SetAllTasksAction {
  tasks: Task[];
  type: typeof SET_ALL_TASKS;
}
export type TaskAction =
  | AddTaskAction
  | EditTaskAction
  | DeleteTaskAction
  | SetTasksAction
  | SetAllTasksAction;

  export const fetchTasks = () => {
    return async (dispatch: any) => {
      try {
        const response = await axios.get('/api/users');
        dispatch({
          type: SET_TASKS,
          users: response.data
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  };

  export const fetchAllTasks = () => {
    return async (dispatch: any) => {
      try {
        const response = await axios.get('/api/tasks');
        dispatch({
          type: SET_TASKS,
          users: response.data
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  };
  
  export const addTask = (user: Task) => {
    return async (dispatch: any) => {
      try {
        const response = await axios.post('/api/users', user);
        dispatch({
          type: ADD_TASK,
          user: response.data
        });
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };
  };
  
  export const editTask = (userId: number, updatedTask: Task) => {
    return async (dispatch: any) => {
      try {
        const response = await axios.put(`/api/users/${userId}`, updatedTask);
        dispatch({
          type: EDIT_TASK,
          editTask: response.data
        });
      } catch (error) {
        console.error('Error editing user:', error);
      }
    };
  };
  
  export const deleteTask = (userId: number) => {
    return async (dispatch: any) => {
      try {
        await axios.delete(`/api/users/${userId}`);
        dispatch({
          type: DELETE_TASKS,
          deleteTaskId: userId
        });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  };