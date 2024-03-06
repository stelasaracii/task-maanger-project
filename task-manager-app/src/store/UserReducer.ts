import { User } from "../typings/User";
import { ADD_USER, DELETE_USERS, EDIT_USER, SET_USERS } from "./constants";
import { UserAction } from "./UserAction";
import { UserState } from "./UserState";

export function userReducer(state: UserState, action: UserAction): UserState {

  switch (action.type) {
    case ADD_USER: {
      return { ...state, users: [...state.users, action.user] };
    }

    case SET_USERS: {
      return {...state, users: action.users};
    }

    case EDIT_USER: {
      const updatedUser = state.users.map((user: User) => {
        if (user.id == action.user.id) {
          return action.user;
        }
        return user;
      });

      return { ...state, users: updatedUser };
    }

    case DELETE_USERS: {
      const tasks = state.users.filter(
        (item) => item.id != action.deleteUserId
      );

      return { ...state, users: tasks };
    }

    default: {
      return state;
    }
  }
}