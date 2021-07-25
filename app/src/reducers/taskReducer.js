import { client } from "../utils/index";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";




export const getTask = createAsyncThunk(
    "taskReducer/getTask",
    async (taskId) => {
        const { data: task } = await client(
            `${process.env.REACT_APP_BE}/tasks/${taskId}`
        );
        return task;
    });


export const taskReducer = createSlice({
    name: "taskReducer",
    initialState: {
        isFetching: true,
        data: {},
    },
    reducers: {
        addTask(state, action) {
            state.tasks = [action.payload, ...state.tasks];
        },



        removeTask(state, action) {
            state.data = {
                ...state.data,
                tasks: state.tasks.filter(

                    (taskId) => taskId !== action.payload
                ),
            };
        },

        updateTaskId(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        clearTask(state, action) {
            state.isFetching = true;
            state.data = {};
        },
    },

    extraReducers: {
        [getTask.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.data = action.payload;
        },
    }
});

export const { addTask, removeTask, updateTaskId, clearTask, } = taskReducer.actions;

export default taskReducer.reducer;











