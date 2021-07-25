import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Button from "../styles/Button";
import ColorCard from "./ColorCard";
import {getColors} from "../reducers/colorsReducer";
import AddColor from "./AddColor";


const Colors = () => {
    const dispatch = useDispatch();
    const { isFetching, colors } = useSelector((state) => state.colorsReducer);

    console.log("looking colorId", isFetching, colors, "end looking")

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);


    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);

    console.log("looking colorId", colors, "end looking")


    return (
        <>

            <h2>Colors</h2>
            <Link to="/">
                <Button grey>RETURN</Button>
            </Link>
            <Link to="/colors/add-color">
                <Button onClick={() => setShowModal(true)}>
                    ADD COLOR
                </Button>
            </Link>
            {!isFetching &&
            colors.map((color) => (
                <Link key={color.id} to={`/colors/${color.id}`}>
                    <ColorCard color={color}/>
                </Link>
            ))}


            {showModal && <AddColor closeModal={closeModal}/>}
        </>
    );

};



export default Colors;