import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { client } from "../utils/index";
import Button from "../styles/Button";
import { toast } from "react-toastify";
import useInput from "../hooks/useInput";
import {Link, useParams} from "react-router-dom";
import {getTask, updateTaskId, clearTask} from "../reducers/taskReducer";

const openModal = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 900;
  background: rgba(0, 0, 0, 0.7);
  animation: ${openModal} 0.5s ease-in-out;

  .edit-profile {
    width: 580px;
    border-radius: 4px;
    background: ${(props) => props.theme.grey};
    margin: 36px auto;
    box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.4), 0px 0px 4px rgba(0, 0, 0, 0.25);
  }

  .edit-profile img {
    object-fit: cover;
  }

  .avatar {
    margin-top: -40px;
    margin-left: 20px;
  }

  div.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
  }

  h3 {
    display: flex;
    align-items: center;
  }

  form {
    padding: 1rem;
  }

  input,
  textarea {
    width: 100%;
    background: ${(props) => props.theme.black};
    border: 1px solid ${(props) => props.theme.black};
    margin-bottom: 1rem;
    padding: 0.6rem 1rem;
    border-radius: 3px;
    color: ${(props) => props.theme.primaryColor};
  }

  textarea {
    height: 75px;
  }

  svg {
    fill: ${(props) => props.theme.red};
    height: 22px;
    width: 22px;
    margin-right: 1rem;
    position: relative;
    top: -1px;
  }

  @media screen and (max-width: 600px) {
    .edit-profile {
      width: 90%;
      margin: 4rem auto;
    }
  }

  @media screen and (max-width: 400px) {
    background: rgba(0, 0, 0, 0.9);
  }
`;



const EditTask = () => {
    const { taskId } = useParams();

    const dispatch = useDispatch();


    // console.log('Смотрим useParam colorId',  colorId,  'смотрим дальше')

    const { isFetching: taskFetching, data: task } = useSelector(
        (state) => state.taskReducer
    );

    // console.log('Смотрим useSelector color & colorId',colorFetching, color, colorId, 'смотрим дальше')



    const title = useInput(task.title);
    const description = useInput(task.description);
    const text = useInput(task.text);
    const completed = useInput(task.completed);
    const dataCreated = useInput(task.dataCreated);
    const dataEnd = useInput(task.dataEnd);
    const listId = useInput(task.listId);


    // console.log('Смотрим useInput color  hex  name', color, hex, name, colorId, 'смотрим дальше')




    const handleUpdateTask = () => {
        if (!title.value.trim() ||
            !description.value.trim() ||
            !text.value.trim() ||
            !completed.value.trim() ||
            !dataCreated.value.trim() ||
            !dataEnd.value.trim()||
            !listId.value.trim())
        {
            return toast.error("Err! input should not be empty");
        }


        const data = {
            title: title.value,
            description: description.value,
            text: text.value,
            completed: completed.value,
            dataCreated: dataCreated.value,
            dataEnd: dataEnd.value,
            listId: listId.value,
        };

        const updates = { ...data };

        dispatch(updateTaskId(updates));

        client(`${process.env.REACT_APP_BE}/tasks/${taskId}`, {
            body: updates,
            method: "PUT",
        });


        toast.dark("Color updated");

    };







    return (

        <Wrapper>
            <div className="container"></div>
            <div className="edit-profile">
                <div className="modal-header">
                    <h3>
                        <span>Edit Task</span>
                    </h3>
                    <Link to="/tasks">
                        <Button grey>RETURN</Button>
                    </Link>

                    <Link to="/tasks">
                        <Button onClick={handleUpdateTask}>UPDATE</Button>
                    </Link>
                </div>


                <form>
                    <input
                        type="text"
                        placeholder="title"
                        value={title.value}
                        onChange={title.onChange}
                    />
                    <input
                        type="text"
                        placeholder="description"
                        value={description.value}
                        onChange={description.onChange}
                    />
                    <textarea
                        type="text"
                        placeholder="text"
                        value={text.value}
                        onChange={text.onChange}
                    />
                    <input
                        type="text"
                        placeholder="completed"
                        value={completed.value}
                        onChange={completed.onChange}
                    />
                    <input
                        type="text"
                        placeholder="data start task"
                        value={dataCreated.value}
                        onChange={dataCreated.onChange}
                    />
                    <input
                        type="text"
                        placeholder="data end task"
                        value={dataEnd.value}
                        onChange={dataEnd.onChange}
                    />
                    <input
                        type="number"
                        placeholder="listId"
                        value={listId.value}
                        onChange={listId.onChange}
                    />



                </form>
            </div>
        </Wrapper>
    );
};



export default EditTask;
