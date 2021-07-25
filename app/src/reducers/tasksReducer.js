import { client } from "../utils/index";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



export const getTasks = createAsyncThunk(
    "tasksReducer/getTasks",
    async () => {
        const { data } = await client(`${process.env.REACT_APP_BE}/tasks`);
        return data;
    }
);


export const tasksReducer = createSlice({
    name: "tasksReducer",
    initialState: {
        isFetching: true,
        tasks: [],
    },
    reducers: {
        addToTasks(state, action) {
            state.tasks = [action.payload, ...state.tasks];
        },
    },
    extraReducers: {
        [getTasks.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.tasks = action.payload;
        },
    }
});

export const { addToTasks } = tasksReducer.actions;
export default tasksReducer.reducer;