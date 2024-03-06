import React, { createContext, useReducer } from "react";
import { User } from "../typings/User";
import {
  ADD_USER,
  DELETE_USERS,
  EDIT_USER,
  SET_USERS,
} from "./constants";
import { UserState } from "./UserState";
import { userReducer } from "./UserReducer";
import { makeApiRequest } from "../utils/makeApiRequest";

type Props = {
  children?: React.ReactNode;
};

const initialState: UserState = { users: [] };
export const UserContext = createContext<any>({
  users: [],
  addUser: (user: User) => {},
  setUsers: () => {},
  deleteUser: (id: number) => {},
});

export const UsersProvider = ({ children }: Props) => {
  const [usersState, dispatch] = useReducer(userReducer, initialState);
 
  async function addUser(user: User) {
    try {
      const response = await makeApiRequest("POST", `/users`, user);
      dispatch({ type: ADD_USER, user: response });
    } catch (error) {
      console.error("Error adding user:", error);
    }
  }
  async function setUsers() {
    try {
      const response = await makeApiRequest("GET", "/users");
      dispatch({ type: SET_USERS, users: response });
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  async function editUser(userId: number, updatedUser: User) {
    try {
      const response = await makeApiRequest("PATCH", `/users/${userId}`, updatedUser);
      dispatch({ type: EDIT_USER, user: response });
    } catch (error) {
      console.error("Error editing user:", error);
    }
  }
  async function deleteUser(userId: number) {
    try {
      makeApiRequest("DELETE", `/users/${userId}`);
      dispatch({ type: DELETE_USERS, deleteUserId: userId });
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const value1 = {
    addUser: addUser,
    deleteUser: deleteUser,
    editUser: editUser,
    setUsers: setUsers,
    users: usersState.users,
  };

  return <UserContext.Provider value={value1}>{children}</UserContext.Provider>;
};
