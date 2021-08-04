import React, {useState} from "react";
import { useDispatch } from "react-redux";
import styled, { keyframes } from "styled-components";
import { client } from "../utils/index";
import Button from "../styles/Button";
import {Link, useParams} from "react-router-dom";
import { removeColor } from "../reducers/colorReducer";
// import {getColors} from "../reducers/colorsReducer";






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

const DeleteColor = () => {
    const { colorId } = useParams();
    console.log('colorId', colorId, 'смотрим дальше')
    const dispatch = useDispatch();



    const defaultColors = []


    const [updateColors] = useState(defaultColors);



    const handleRemoveColor = () => {

        console.log('Looking updateColors on colorId', colorId, 'смотрим дальше')

        updateColors(colors =>  dispatch(removeColor(colorId)));

        client(`${process.env.REACT_APP_BE}/colors/${colorId}`, {
            body: { text: colorId.value },
            method: "DELETE",
        });

    };
    console.log('Looking on colorId', colorId, 'смотрим дальше')



        return (
            <Wrapper>
                <div className="edit-profile">
                    <div className="modal-header">
                        <h3>Are you sure you want to delete the color?</h3>
                        <Link to="/colors">
                            <Button grey>RETURN</Button>
                        </Link>
                        <Link to="/colors">
                            <Button onClick={handleRemoveColor}>DELETE</Button>
                        </Link>

                    </div>
                </div>

            </Wrapper>
        );
}
export default DeleteColor;
