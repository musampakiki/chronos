import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Button from "../styles/Button";
import TaskCard from "./TaskCard";
import {getTasks} from "../reducers/tasksReducer";
import AddTask from "./AddTask";
import styled from "styled-components";

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


const Tasks = () => {
    const dispatch = useDispatch();
    const { isFetching, tasks } = useSelector((state) => state.tasksReducer);

    // console.log("looking listId", isFetching, lists, "end looking")

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);


    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);

    // console.log("looking listId", lists, "end looking")


    return (
        <StyledHome>
            <div className="home-header">
                <h2 className="item-header">Tasks</h2>
                <Link className="item-header" to="/">
                    <Button grey>RETURN</Button>
                </Link>
                <Link className="item-header" to="/tasks/add-task">
                    <Button className="home-header" onClick={() => setShowModal(true)}>
                        ADD TASK
                    </Button>
                </Link>
            </div>
            {!isFetching &&
            tasks.map((task) => (
                <Link key={task.id} to={`/tasks/${task.id}`}>
                    <TaskCard task={task}/>
                </Link>
            ))}


            {showModal && <AddTask closeModal={closeModal}/>}
        </StyledHome>
    );

};

export default Tasks;