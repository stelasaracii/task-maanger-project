import React, { createContext, useReducer } from "react";
import { Task } from "../typings/Task";
import {
  ADD_TASK,
  DELETE_TASKS,
  EDIT_TASK,
  SET_ALL_TASKS,
  SET_TASKS,
} from "./constants";
import { TaskState } from "./TaskState";
import { taskReducer } from "./TaskReducer";
import { makeApiRequest } from "../utils/makeApiRequest";

type Props = {
  children?: React.ReactNode;
};

const initialState: TaskState = { tasks: [] };
export const TaskContext = createContext<any>({
  tasks: [],
  addTask: (task: Task) => {},
  setTasks: () => {},
  editTask: (id: number, task: Task) => {},
  deleteTask: (id: number) => {},
});

export const TasksProvider = ({ children }: Props) => {
  const [tasksState, dispatch] = useReducer(taskReducer, initialState);
  // useEffect(() => {
  //   setTasks();
  // }, []);
  async function addTask(task: Task) {
    try {
      const response = await makeApiRequest('POST' ,'/tasks', task);
      dispatch({ type: ADD_TASK, task: response });
    } catch (error) {
      console.error("Error adding task:", error);
    }
}

  async function setTasks() {
    try {
      const response = await makeApiRequest('GET', `/tasks`);
      dispatch({ type: SET_ALL_TASKS, tasks: response });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function setTasksByUserId() {
    try {
      const response = await makeApiRequest('GET', `/my-tasks`);
      dispatch({ type: SET_TASKS, tasks: response });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function editTask(taskId: number, updatedTask: Task){
    try {
        const response = await makeApiRequest('PATCH', `/tasks/${taskId}`, updatedTask);
        dispatch({ type: EDIT_TASK, task: response });
      } catch (error) {
        console.error("Error editing task:", error);
      }
  }
  async function deleteTask(taskId: number) {
    try {
      await makeApiRequest('DELETE' , `/tasks/${taskId}`);
      dispatch({ type: DELETE_TASKS, deleteTaskId: taskId });
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }
  const value1 = {
    addTask: addTask,
    deleteTask: deleteTask,
    setTasks: setTasks,
    setTasksByUserId: setTasksByUserId,
    editTask: editTask,
    tasks: tasksState.tasks,
  };

  return <TaskContext.Provider value={value1}>{children}</TaskContext.Provider>;
};
