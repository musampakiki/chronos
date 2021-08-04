import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { CloseIcon } from "./Icons";
import Button from "../styles/Button";
import useInput from "../hooks/useInput";

import {addToTasks} from "../reducers/tasksReducer";
import { client } from "../utils/index";
import {Link} from "react-router-dom";
// import DateInput from "./DateInput"

//multiselect
import {getLists} from "../reducers/listsReducer";
// import {getList} from "../reducers/listReducer";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import {getColors} from "../reducers/colorsReducer";

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        minWidth: 120,
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 0.2rem 0.1rem rgba(80,100,150, 1)',
        borderRadius: 4,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: theme.spacing(-3),
        marginRight: theme.spacing(-3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 250,
    },
}));
//end multiselect
//
const openModal = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;
const Date = styled.div`
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
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
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 4px rgba(0, 0, 0, 0.25);
  }

  .edit-profile img {
    object-fit: cover;
  }

  .avatar {
    height: 80px;
    width: 80px;
    
    border-radius: 40px;
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



const AddTask= () => {
    const dispatch = useDispatch();

    //multiselect
   /* const { data: list } = useSelector(
        (state) => state.listReducer
    );*/
    const { lists } = useSelector(
        (state) => state.listsReducer
    );

    useEffect(() => {
        dispatch(getLists());
    }, [dispatch]);

    const classes = useStyles();
//end multiselect

    const title = useInput("");
    const description = useInput("");
    const text = useInput("");
    // const completed = useInput("");
    const dataCreated = useInput("");
    const dataEnd = useInput("");
    const listId = useInput("");

    const [tab, setTab] = useState("ADD");


    const handleTaskTab = async () => {
        if (tab === "FORM") {
            setTab("FORM");
        } else {
            if (!title.value.trim() ||
                !description.value.trim() ||
                !text.value.trim() ||
                // !completed.value.trim() ||
                !dataCreated.value.trim() ||
                !dataEnd.value.trim()||
                !listId.value.trim())
            {
                return toast.error("Please fill in all the fields");
            }
            const newTask = {
                title: title.value,
                description: description.value,
                text: text.value,
                // completed: completed.value,
                dataCreated: dataCreated.value,
                dataEnd: dataEnd.value,
                listId: listId.value,
            };

            const {data: task} = await client(
                `${process.env.REACT_APP_BE}/tasks`,
                {body: newTask}
            );


            dispatch(
                addToTasks({
                    ...task,
                })
            );
        }
    }


    return (

        <Wrapper>


            <div className="edit-profile">
                <div className="modal-header">
                    <h3>
                        <Link to="/tasks">
                            <CloseIcon />
                        </Link>
                        <span>New Task</span>
                    </h3>
                    <Link to="/tasks">
                        <Button onClick={handleTaskTab}>Save</Button>
                        {tab === "FORM"}
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
                        placeholder="text"
                        value={text.value}
                        onChange={text.onChange}
                    />
           <Date>
               <form className={classes.container} noValidate>
                   <TextField
                       id="datetime-local"
                       label="Date start task"
                       type="datetime-local"
                       defaultValue=""
                        value={dataCreated.value}
                        onChange={dataCreated.onChange}
                       className={classes.textField}
                       InputLabelProps={{
                           shrink: true,
                       }}
                   />
               </form>
               <form className={classes.container} noValidate>
                   <TextField
                       id="datetime-local"
                       label="Date end task"
                       type="datetime-local"
                       defaultValue=""
                        value={dataEnd.value}
                        onChange={dataEnd.onChange}
                       className={classes.textField}
                       InputLabelProps={{
                           shrink: true,
                       }}
                   />
               </form>
            </Date>




            {/*<input*/}
                    {/*    type="text"*/}
                    {/*    placeholder="data start task"*/}
                    {/*    value={dataCreated.value}*/}
                    {/*    onChange={dataCreated.onChange}*/}
                    {/*/>*/}
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    placeholder="data end task"*/}
                    {/*    value={dataEnd.value}*/}
                    {/*    onChange={dataEnd.onChange}*/}
                    {/*/>*/}
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-list-native-simple">List</InputLabel>
                        <Select
                            native
                            value={listId.value}
                            onChange={listId.onChange}
                            inputProps={{
                                name: 'list',
                                id: 'filled-list-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {lists.map((list) => (
                                <option key={list.id} value={list.id}>{list.name}</option>))}

                        </Select>
                    </FormControl>


                </form>
                {/*<FormControl variant="outlined" className={classes.formControl}>*/}
                {/*    <InputLabel htmlFor="outlined-age-native-simple">Colors</InputLabel>*/}
                {/*    <Select*/}
                {/*        native*/}
                {/*        value={state.colorId}*/}
                {/*        onChange={handleChange}*/}
                {/*        label="Age"*/}
                {/*        inputProps={{*/}
                {/*            name: 'colorId',*/}
                {/*            id: 'outlined-age-native-simple',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <option aria-label="None" value="" />*/}
                {/*        <option  value={id}>{id}</option>*/}

                {/*    </Select>*/}
                {/*</FormControl>*/}

            </div>

        </Wrapper>

    );
};

export default AddTask;
