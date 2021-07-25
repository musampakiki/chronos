import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../utils/index";
import http from "../http-common";



const getAllColors = createAsyncThunk(
    "colors/getAll",
    async () => {
        const { data } = await client(
            http.get("/colors"))
    return data
});

const getColorId = createAsyncThunk(
    "color/getColorId",
    async (id) => {
        const { data: color } = await client(
            http.get(`/colors/${id}`))
    return color
});

const createColorId = data => {
    return client(
        `${process.env.REACT_APP_BE}/colors`,
        { body: data }
    );
}

// const create = data => {
//     return http.post("/tutorials", data);
// };

const update = (id, data) => {
    return http.put(`/colors/${id}`, data);
};

const remove = id => {
    return http.delete(`/colors/${id}`);
};

const removeAll = () => {
    return http.delete(`/colors`);
};

const findByTitle = name => {
    return http.get(`/colors?name=${name}`);
};

const ColorService = {
    getAllColors,
    getColorId,
    createColorId,
    update,
    remove,
    removeAll,
    findByTitle
};

export default ColorService;