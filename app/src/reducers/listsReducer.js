import { client } from "../utils/index";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



export const getLists = createAsyncThunk(
    "listsReducer/getLists",
    async () => {
        const { data } = await client(`${process.env.REACT_APP_BE}/lists`);
        return data;
    }
);


export const listsReducer = createSlice({
    name: "listsReducer",
    initialState: {
        isFetching: true,
        lists: [],
    },
    reducers: {
        addToLists(state, action) {
            state.lists = [action.payload, ...state.lists];
        },
    },
    extraReducers: {
        [getLists.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.lists = action.payload;
        },
    }
});

export const { addToLists } = listsReducer.actions;
export default listsReducer.reducer;