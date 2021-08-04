import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Button from "../styles/Button";
import ColorCard from "./ColorCard";
import {getColors} from "../reducers/colorsReducer";
import AddColor from "./AddColor";
import styled from "styled-components";

import VideoGrid from "../styles/ArticleGrid";
export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;
  padding-bottom: 7rem;
  h2 {
    margin-bottom: 1rem;
  }
  .home-header{
  display: flex;
  align-items: center;
  }
  .item-header{
  margin:30px;
  }
  @media screen and (max-width: 1093px) {
    width: 95%;
  }
  @media screen and (max-width: 1090px) {
    width: 99%;
  }
  @media screen and (max-width: 870px) {
    width: 90%;
  }
  @media screen and (max-width: 670px) {
    width: 99%;
  }
  @media screen and (max-width: 600px) {
    width: 90%;
  }
  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;


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
        <StyledHome>
            <VideoGrid>
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
                </VideoGrid>
        </StyledHome>
    );

};



export default Colors;