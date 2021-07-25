import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Button from "../styles/Button";
import TaskCard from "./TaskCard";
import {getTasks} from "../reducers/tasksReducer";
import AddTask from "./AddTask";


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
        <>

            <h2>Tasks</h2>
            <Link to="/">
                <Button grey>RETURN</Button>
            </Link>
            <Link to="/tasks/add-task">
                <Button onClick={() => setShowModal(true)}>
                    ADD TASK
                </Button>
            </Link>
            {!isFetching &&
            tasks.map((task) => (
                <Link key={task.id} to={`/tasks/${task.id}`}>
                    <TaskCard task={task}/>
                </Link>
            ))}


            {showModal && <AddTask closeModal={closeModal}/>}
        </>
    );

};

export default Tasks;