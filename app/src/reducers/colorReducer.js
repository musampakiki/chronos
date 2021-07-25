import { client } from "../utils/index";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";




export const getColor = createAsyncThunk(
    "colorReducer/getColor",
    async (colorId) => {
    const { data: color } = await client(
        `${process.env.REACT_APP_BE}/colors/${colorId}`
        );
    return color;
});


export const colorReducer = createSlice({
     name: "colorReducer",
     initialState: {
         isFetching: true,
         data: {},
},
    reducers: {
        addColor(state, action) {
            state.colors = [action.payload, ...state.colors];
        },



        removeColor(state, action) {
            state.data = {
                ...state.data,
                colors: state.colors.filter(

                    (colorId) => colorId !== action.payload
                ),
            };
        },

        updateColorId(state, action) {
            state.data = {
                ...state.data,
                ...action.payload,
            };
        },
        clearColor(state, action) {
            state.isFetching = true;
            state.data = {};
        },
    },

    extraReducers: {
        [getColor.fulfilled]: (state, action) => {
            state.isFetching = false;
            state.data = action.payload;
        },
    }
});

export const { addColor, removeColor, updateColorId, clearColor, } = colorReducer.actions;

export default colorReducer.reducer;











