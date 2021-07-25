import { client } from "../utils/index";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



export const getColors = createAsyncThunk(
    "colorsReducer/getColors",
    async () => {
        const { data } = await client(`${process.env.REACT_APP_BE}/colors`);
        return data;
    }
);


export const colorsReducer = createSlice({
    name: "colorsReducer",
    initialState: {
        isFetching: true,
        colors: [],
    },
    reducers: {
        addToColors(state, action) {
            state.colors = [action.payload, ...state.colors];
        },
    },
    extraReducers: {
        [getColors.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.colors = action.payload;
        },
    }
});

export const { addToColors } = colorsReducer.actions;
export default colorsReducer.reducer;