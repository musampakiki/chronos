// import { client } from "../utils/index";
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//
// import {
//     CREATE_ITEM,
//     RETRIEVE_ITEMS,
//     UPDATE_ITEM,
//     DELETE_ITEM,
//     DELETE_ALL_ITEMS,
// } from "../constants";
//
// const initialState = [];
//
// const colorReducer = (colors = initialState, action) => {
//     const { type, payload } = action;
//
//     switch (type) {
//         case CREATE_ITEM:
//             return [...colors, payload];
//
//         case RETRIEVE_ITEMS:
//             return payload;
//
//         case UPDATE_ITEM:
//             return colors.map((color) => {
//                 if (color.id === payload.id) {
//                     return {
//                         ...color,
//                         ...payload,
//                     };
//                 } else {
//                     return color;
//                 }
//             });
//
//         case DELETE_ITEM:
//             return colors.filter(({ id }) => id !== payload.id);
//
//         case DELETE_ALL_ITEMS:
//             return [];
//
//         default:
//             return colors;
//     }
// };
// export default colorReducer;