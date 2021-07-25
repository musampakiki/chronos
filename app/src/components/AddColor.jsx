import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { toast } from "react-toastify";
import { CloseIcon } from "./Icons";
import Button from "../styles/Button";
import useInput from "../hooks/useInput";
// import { addColor } from "../reducers/colorReducer";
import {addToColors} from "../reducers/colorsReducer";

import { client } from "../utils/index";
import {Link} from "react-router-dom";

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

const AddColor = () => {
    const dispatch = useDispatch();


    const hex = useInput("");
    const name = useInput("");

    const [tab, setTab] = useState("ADD");

    const handleColorTab = async () => {
        if (tab === "FORM") {
            setTab("FORM");
        } else {
            if (!hex.value.trim() || !name.value.trim()) {
                return toast.error("Please fill in all the fields");
            }
            const newColor = {
                hex: hex.value,
                name: name.value,
            };

            const {data: color} = await client(
                `${process.env.REACT_APP_BE}/colors`,
                {body: newColor}
            );


            dispatch(
                addToColors({
                    ...color,
                })
            );
        }
    }


    return (

        <Wrapper>


            <div className="edit-profile">
                <div className="modal-header">
                    <h3>
                        <Link to="/colors">
                            <CloseIcon />
                        </Link>
                        <span>New Color</span>
                    </h3>
                    <Link to="/colors">
                        <Button onClick={handleColorTab}>Save</Button>
                        {tab === "FORM"}
                    </Link>
                </div>
                <form>
                    <input
                        type="text"
                        placeholder="hex"
                        value={hex.value}
                        onChange={hex.onChange}
                    />
                    <input
                        type="text"
                        placeholder="name"
                        value={name.value}
                        onChange={name.onChange}
                    />
                </form>
            </div>

        </Wrapper>

    );
};

export default AddColor;
