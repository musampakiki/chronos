import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { keyframes } from "styled-components";
import { client } from "../utils/index";
import Button from "../styles/Button";
import { toast } from "react-toastify";
import useInput from "../hooks/useInput";
import {Link, useParams} from "react-router-dom";
import {updateColorId} from "../reducers/colorReducer";
// import {createAsyncThunk} from "@reduxjs/toolkit";

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
    box-shadow: 0 0 0 rgba(0, 0, 0, 0.4), 0 0 4px rgba(0, 0, 0, 0.25);
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



const EditColor = () => {
    const { colorId } = useParams();

    const dispatch = useDispatch();


    console.log('Смотрим useParam colorId',  colorId,  'смотрим дальше')
    // const { data: user } = useSelector((state) => state.user);
    // const { color } = useSelector((state) => state.color.data);
    // const { data: user } = useSelector((state) => state.user);
    const { isFetching: colorFetching, data: color } = useSelector(
        (state) => state.colorReducer
    );

    console.log('Смотрим useSelector color & colorId',colorFetching, color, colorId, 'смотрим дальше')


    const hex = useInput(color.hex);
    const name = useInput(color.name);

    console.log('Смотрим useInput color  hex  name', color, hex, name, colorId, 'смотрим дальше')

    // uploaded avatar, cover
    // const [hex, setHex] = useState("");
    // const [name, setName] = useState("");


    const handleUpdateColor = () => {
        if (!hex.value.trim()) {
            return toast.error("Err! hex should not be empty");
        }

        if (!name.value.trim()) {
            return toast.error("Err! color should not be empty");
        }

        const data = {
            hex: hex.value,
            name: name.value,
        };

        // if (avatar) data.avatar = avatar;
        // if (cover) data.cover = cover;

        const updates = { ...data };

        dispatch(updateColorId(updates));

        client(`${process.env.REACT_APP_BE}/colors/${colorId}`, {
            body: updates,
            method: "PUT",
        })
        
        toast.dark("Color updated")


    };

    return (

        <Wrapper>

            <div className="edit-profile">
                <div className="modal-header">
                    <h3>
                        <span>Edit Color</span>
                    </h3>
                    <Link to="/colors">
                        <Button grey>RETURN</Button>
                    </Link>

                    <Link to="/colors">
                         <Button onClick={handleUpdateColor}>UPDATE</Button>
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








//         <Wrapper>
//             <div className="edit-profile">
//                 <div className="modal-header">
//                     <h1>{color.name}</h1>
//                     <p>{color.hex}</p>
//                     <Link to="/colors">
//                         <Button grey>RETURN</Button>
//                     </Link>
//                     <Link to="/colors">
//                         <Button onClick={handleUpdateColor}>UPDATE</Button>
//                     </Link>
//
//                 </div>
//             </div>
//
//         </Wrapper>
//     );
// }


export default EditColor;
