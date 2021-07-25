import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/index";
import ColorService from "../services/colorServices";

import {
    CREATE_ITEM,
    // RETRIEVE_ITEMS,
    // UPDATE_ITEM,
    // DELETE_ITEM,
    // DELETE_ALL_ITEMS,
} from "../constants";



export const createColor = (hex, name) => createAsyncThunk (
    "CREATE_ITEM",
    async (dispatch) => {
    try {
        const res = await client (ColorService.createColorId({ hex, name }));

        dispatch({
            type: CREATE_ITEM,
            payload: res.data,
        });
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
});

// export const createTutorial = (title, description) => async (dispatch) => {
//     try {
//         const res = await TutorialDataService.create({ title, description });
//
//         dispatch({
//             type: CREATE_TUTORIAL,
//             payload: res.data,
//         });
//
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };

// export const retrieveColors = () => async (dispatch) => {
//     try {
//         const res = await ColorDataService.getAllColors();
//
//         dispatch({
//             type: RETRIEVE_ITEMS,
//             payload: res.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };
//
// export const updateColor = (id, data) => async (dispatch) => {
//     try {
//         const res = await ColorDataService.update(id, data);
//
//         dispatch({
//             type: UPDATE_ITEM,
//             payload: data,
//         });
//
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };
//
// export const deleteColor = (id) => async (dispatch) => {
//     try {
//         await ColorDataService.remove(id);
//
//         dispatch({
//             type: DELETE_ITEM,
//             payload: { id },
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };
//
// export const deleteAllColors = () => async (dispatch) => {
//     try {
//         const res = await ColorDataService.removeAll();
//
//         dispatch({
//             type: DELETE_ALL_ITEMS,
//             payload: res.data,
//         });
//
//         return Promise.resolve(res.data);
//     } catch (err) {
//         return Promise.reject(err);
//     }
// };
//
// export const findTutorialsByName = (name) => async (dispatch) => {
//     try {
//         const res = await ColorDataService.findByTitle(name);
//
//         dispatch({
//             type: RETRIEVE_ITEMS,
//             payload: res.data,
//         });
//     } catch (err) {
//         console.log(err);
//     }
// };