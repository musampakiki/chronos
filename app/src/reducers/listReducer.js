import { client } from "../utils/index";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";




export const getList = createAsyncThunk(
    "listReducer/getList",
    async (listId) => {
        const { data: list } = await client(
            `${process.env.REACT_APP_BE}/lists/${listId}`
        );
        return list;
    });


export const listReducer = createSlice({
    name: "listReducer",
    initialState: {
        isFetching: true,
        data: {},
    },
    reducers: {
        addList(state, action) {
            state.lists = [action.payload, ...state.lists];
        },



        removeList(state, action) {
            state.data = {
                ...state.data,
                lists: state.lists.filter(

                    (listId) => listId !== action.payload
                ),
            };
        },

        updateListId(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        clearList(state, action) {
            state.isFetching = true;
            state.data = {};
        },
    },

    extraReducers: {
        [getList.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.data = action.payload;
        },
    }
});

export const { addList, removeList, updateListId, clearList, } = listReducer.actions;

export default listReducer.reducer;











