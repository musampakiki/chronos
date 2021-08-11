import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Button from "../styles/Button";
import ListCard from "./ListCard";
import {getLists} from "../reducers/listsReducer";
import AddList from "./AddList";


import styled from "styled-components";
// import Skeleton from "../skeletons/HomeSkeleton";
import VideoGrid from "../styles/ArticleGrid";


export const StyledHome = styled.div`
  padding: 1.3rem;
  width: 90%;
  margin: 0 auto;

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



const Lists = () => {
    const dispatch = useDispatch();
    const { isFetching, lists } = useSelector((state) => state.listsReducer);

    console.log("looking listId", isFetching, lists, "end looking")

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);


    useEffect(() => {
        dispatch(getLists());
    }, [dispatch]);

    // console.log("looking listId", lists, "end looking")


    return (
        <StyledHome>
            <div className="home-header">
            <h2 className="item-header">Lists</h2>
            <Link className="item-header" to="/">
                <Button grey>RETURN</Button>
            </Link>
            <Link className="item-header" to="/lists/add-list">
                <Button className="home-header" onClick={() => setShowModal(true)}>
                    ADD LIST
                </Button>
            </Link>
            </div>

            <VideoGrid>
            {!isFetching &&
            lists.map((list) => (
                <Link key={list.id} to={`/lists/${list.id}`}>
                    <ListCard list={list}/>
                </Link>
            ))}


            {showModal && <AddList closeModal={closeModal}/>}
        </VideoGrid>
        </StyledHome>
    );

};

export default Lists;