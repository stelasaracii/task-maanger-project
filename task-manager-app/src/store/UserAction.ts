import axios from "axios";
import { User } from "../typings/User";
import { ADD_USER, DELETE_USERS, EDIT_USER, SET_USERS } from "./constants";

interface AddUserAction {
  user: User;
  type: typeof ADD_USER;
}

interface EditUserAction {
  user: User;
  type: typeof EDIT_USER;
}

interface DeleteUserAction {
  deleteUserId: number;
  type: typeof DELETE_USERS;
}

interface SetUsersAction {
  users: User[];
  type: typeof SET_USERS;
}
export type UserAction =
  | AddUserAction
  | EditUserAction
  | DeleteUserAction
  | SetUsersAction;

  export const fetchUsers = () => {
    return async (dispatch: any) => {
      try {
        const response = await axios.get('/api/users');
        dispatch({
          type: SET_USERS,
          users: response.data
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  };
  
  export const addUser = (user: User) => {
    return async (dispatch: any) => {
      try {
        const response = await axios.post('/api/users', user);
        dispatch({
          type: ADD_USER,
          user: response.data
        });
      } catch (error) {
        console.error('Error adding user:', error);
      }
    };
  };
  
  export const editUser = (userId: number, updatedUser: User) => {
    return async (dispatch: any) => {
      try {
        const response = await axios.put(`/api/users/${userId}`, updatedUser);
        dispatch({
          type: EDIT_USER,
          editUser: response.data
        });
      } catch (error) {
        console.error('Error editing user:', error);
      }
    };
  };
  
  export const deleteUser = (userId: number) => {
    return async (dispatch: any) => {
      try {
        await axios.delete(`/api/users/${userId}`);
        dispatch({
          type: DELETE_USERS,
          deleteUserId: userId
        });
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };
  };