import { Task } from "../typings/Task";
import { ADD_TASK, DELETE_TASKS, EDIT_TASK, SET_ALL_TASKS, SET_TASKS } from "./constants";
import { TaskAction } from "./TaskAction";
import { TaskState } from "./TaskState";

export function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case ADD_TASK: {
      const updatedTasks = [...state.tasks, action.task];
      return { ...state, tasks: updatedTasks };
    }

    case SET_TASKS: {
      return { ...state, tasks: action.tasks };
    }

    case SET_ALL_TASKS: {
      return { ...state, tasks: action.tasks };
    }

    case EDIT_TASK: {
      const updatedTasks = state.tasks.map((task: Task) => {
        if (task.id == action.task.id) {
          return action.task;
        }
        return task;
      });
      
      return { ...state, tasks: updatedTasks };
    }

    case DELETE_TASKS: {
      const tasks = state.tasks.filter(
        (item) => item.id != action.deleteTaskId
      );

      return { ...state, tasks: tasks };
    }

    default: {
      return state;
    }
  }
}
