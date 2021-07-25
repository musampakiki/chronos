import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { CloseIcon } from "./Icons";
import Button from "../styles/Button";
import useInput from "../hooks/useInput";

import {addToLists} from "../reducers/listsReducer";
import { client } from "../utils/index";
import {Link} from "react-router-dom";
// import ArrayColor from "./ArrayColor"
//multiselect
import {getColors} from "../reducers/colorsReducer";
import {getColor} from "../reducers/colorReducer";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
}));
//end multiselect

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


const AddList = () => {
    const dispatch = useDispatch();


//multiselect
    const { data: color } = useSelector(
        (state) => state.colorReducer
    );
    const { colors } = useSelector(
        (state) => state.colorsReducer
    );

    useEffect(() => {
        dispatch(getColors());
    }, [dispatch]);
    console.log("проверка data, hex, colorId, name",color)
    const classes = useStyles();
//end multiselect


    const name = useInput("");
    const colorId = useInput("");

    const [tab, setTab] = useState("ADD");

    const handleListTab = async () => {
        if (tab === "FORM") {
            setTab("FORM");
        } else {
            if (!name.value.trim() || !colorId.value.trim()) {
                return toast.error("Please fill in all the fields");
            }
            const newList = {
                name: name.value,
                colorId: colorId.value,
            };

            const {data: list} = await client(
                `${process.env.REACT_APP_BE}/lists`,
                {body: newList}
            );


            dispatch(
                addToLists({
                    ...list,
                })
            );
        }
    }


    return (

        <Wrapper>

            <div className="edit-profile">
                <div className="modal-header">
                    <h3>
                        <Link to="/lists">
                            <CloseIcon />
                        </Link>
                        <span>New List</span>
                    </h3>
                    <Link to="/lists">
                        <Button onClick={handleListTab}>Save</Button>
                        {tab === "FORM"}
                    </Link>
                </div>
                <form>
                    <label>Name: </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="enter name"
                        value={name.value}
                        onChange={name.onChange}
                    />

                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel htmlFor="filled-age-native-simple">Color</InputLabel>
                        <Select
                            native
                            value={colorId.value}
                            onChange={colorId.onChange}
                            inputProps={{
                                name: 'color',
                                id: 'filled-age-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {colors.map((color) => (
                            <option key={color.id} value={color.id}>{color.name}</option>))}

                        </Select>
                    </FormControl>
                </form>
            </div>

        </Wrapper>

    );
};

export default AddList;
