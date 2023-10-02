import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorageData, updateLocalStorage } from "../utils/localStorage"; // Import the utility function

// Constants
const TASK_LIST_KEY = "taskList";

// Initial State
const initialValue = {
  filterStatus: "all",
  taskList: getLocalStorageData(TASK_LIST_KEY),
};

// Slice
const taskSlice = createSlice({
  name: "task",
  initialState: initialValue,
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        ...action.payload,
      };
      updateLocalStorage(TASK_LIST_KEY, [...state.taskList, newTask]);
      state.taskList.push(newTask);
    },
    updateTask: (state, action) => {
      const taskList = window.localStorage.getItem(TASK_LIST_KEY);
      if (taskList) {
        const taskListArr = JSON.parse(taskList);
        console.log(action.payload, taskListArr, "taskListArr");
        const updatedTaskList = taskListArr.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              status: action.payload.status,
              title: action.payload.title,
              description: action.payload.description,
            };
          }
          return task;
        });
        window.localStorage.setItem(
          TASK_LIST_KEY,
          JSON.stringify(updatedTaskList)
        );
        state.taskList = [...updatedTaskList];
      }
    },
    deleteTask: (state, action) => {
      const taskList = window.localStorage.getItem(TASK_LIST_KEY);
      if (taskList) {
        const taskListArr = JSON.parse(taskList);
        const updatedTaskList = taskListArr.filter(
          (task) => task.id !== action.payload
        );
        window.localStorage.setItem(
          TASK_LIST_KEY,
          JSON.stringify(updatedTaskList)
        );
        state.taskList = updatedTaskList;
      }
    },
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

// Export actions and reducer
export const { addTask, updateTask, deleteTask, updateFilterStatus } =
  taskSlice.actions;
export default taskSlice.reducer;
