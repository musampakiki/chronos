import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import {Close, Edit} from "@material-ui/icons";
import NoResults from "../components/NoResults";
import Skeleton from "../skeletons/HomeSkeleton";
import EditTask from "./EditTask"
import DeleteTask from "./RemoveTask"


import { clearTask, getTask,} from "../reducers/taskReducer";
import { getTasks } from "../reducers/tasksReducer";
import {
    // client,
    timeSince,
} from "../utils/index";
import Button from "../styles/Button";






const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 7rem 1.3rem;
  
  .article-container .article-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .article-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .article-info-stats {
    display: flex;
    align-items: center;
  }

  .article-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-articles img {
    height: 140px;
  }

  .related-articles div {
    margin-bottom: 1rem;
  }
	@media screen and (max-width: 930px) {
  .related-articles {
    display: none;
  }
    grid-template-columns: 90%;
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .article-info-stats div {
      margin-left: 1rem;
    }
  }
  svg {
    fill: ${(props) => props.theme.darkGrey};
  }
`;

const ColorToCard = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  box-shadow: 0 0 3px #888888;
  background-color: ${(props) => props.color};
`;


const TaskId = () => {
    const { taskId } = useParams();

    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false)

    const { isFetching: taskFetching, data: task } = useSelector(
        (state) => state.taskReducer
    );
    const { isFetching: tasksFetching } = useSelector(
        (state) => state.tasksReducer
    );

    useEffect(() => {
        dispatch(getTask(taskId));
        dispatch(getTasks());


        return () => {
            dispatch(clearTask());
        };
    }, [dispatch, taskId]);

    // console.log("looking after dispatch", list, "end looking")

    if (taskFetching || tasksFetching) {
        return <Skeleton />;
    }

    if (!taskFetching && !task) {
        return (
            <NoResults
                title="Page not found"
                text="The page you are looking for is not found or it may have been removed"
            />
        );
    }

    return (
        <Wrapper>
            <div className="article-container">
                <div className="article-info">
                    <div className="article-info-stats">
                        <p>
                            <span>{timeSince(task.createdAt)} ago</span>
                        </p>

                        <div className="likes-dislikes flex-row">
                            <Link to="/tasks">
                                <Button grey>RETURN</Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="channel-info-description">
                    <div className="channel-info-flex">
                        <div className="channel-info flex-row">
                            {/*<img*/}
                            {/*    className="avatar md"*/}
                            {/*    src={task.User?.avatar}*/}
                            {/*    alt="channel avatar"*/}
                            {/*/>*/}

                            <div className="channel-info-meta">
                                <h4>
                                    <Link to={`/channel/${task.userId}`}>
                                        {task.User?.username}
                                    </Link>
                                </h4>

                            </div>


                            <ColorToCard color={task.title} />
                        </div>

                    </div>

                    <h1>{task.title}</h1>
                    <p>description: {task.description}</p>
                    <p>text: {task.text}</p>
                    <p>completed: {task.completed}</p>
                    <p>data start: {task.dataCreated}</p>
                    <p>data end: {task.dataEnd}</p>
                    <p>list: {task.listId}</p>

                </div>
                <Link to={`/tasks/${task.id}/edit`} onClick={() => setShowModal(true)}>
                    <Edit />
                </Link>
                {showModal && <EditTask closeModal={closeModal} />}
                <Link to={`/tasks/${task.id}/remove`} onClick={() => setShowModal(true)}>
                    <Close />
                </Link>
                {showModal && <DeleteTask closeModal={closeModal} />}
            </div>

        </Wrapper>
    );
};

export default TaskId;
