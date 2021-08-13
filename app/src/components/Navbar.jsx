import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Search from "./Search";
import Avatar from "../styles/Avatar";
import { openSidebar, closeSidebar } from "../reducers/sidebar";
import {logout} from "../reducers/user";
import { Notifications, Menu, ExitToApp } from '@material-ui/icons';
import EditProfileModal from "./EditProfileModal";
import NewEventButton from "../components/NewEventButton";
import Button from "../styles/Button";
import AddTask from "./AddTask";



const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.grey};
  z-index: 99;
  padding: 0.7rem 1.5rem;

  input {
    width: 500px;
  }

  .toggle-navhandler {
    display: none;
  }

  .logo span {
    position: relative;
    top: 1px;
  }

  ul {
    list-style: none;
    display: flex;
    position: relative;
    top: 2px;
    justify-content: flex-start;
  }
  li {
    margin: 0 15px;
  }
  li svg {
    margin:0 1.7rem;
    position: relative;
    top: 3px;
  }

  img {
    position: relative;
    top: 3px;
  }

  @media screen and (max-width: 1093px) {
    .toggle-navhandler {
      display: block;
    }
  }

  @media screen and (max-width: 1000px) {
    input {
      width: 400px;
    }
  }

  @media screen and (max-width: 850px) {
    input {
      width: 280px;
    }
  }

  @media screen and (max-width: 500px) {
    .toggle-navhandler {
      display: none;
    }

    li svg {
      width: 30px;
      height: 30px;
      margin-right: 1.7rem;
      position: relative;
      top: 0px;
    }
  }
`;

const Navbar = () => {
  const dispatch = useDispatch();


  const [showModalTask, setShowModalTask] = useState(false);
  const closeModalTask = () => setShowModalTask(false);
  const [showModalProfile, setShowModalProfile] = useState(false);
  const closeModalProfile = () => setShowModalProfile(false);

  const { data: user } = useSelector((state) => state.user);
  const { sidebar: open } = useSelector((state) => state.sidebar);

  const handleToggleSidebar = () => {
    open ? dispatch(closeSidebar()) : dispatch(openSidebar());
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
    window.location = "/";
  };

  return (
    <Wrapper>
      <div className="logo flex-row">
        <Menu
          className="toggle-navhandler"
          onClick={handleToggleSidebar}
        />
        <span>
          <Link to="/">CHRONOS</Link>
        </span>
      </div>

      <Search />
      <ul>
        <li>
                  <Button className="home-header" onClick={() => setShowModalTask(true)}>
                             ADD TASK
                  </Button>
                  {showModalTask && <AddTask closeModal={closeModalTask}/>}
        </li>

        <li>
          <NewEventButton />
        </li>



        <li>
          <Notifications />
        </li>
        <li>


                   <Avatar className="pointer" src={user.avatar} alt="user-avatar" onClick={() => setShowModalProfile(true)}/>
          {showModalProfile && <EditProfileModal closeModal={closeModalProfile}/>}

        </li>
        <li>
          <ExitToApp onClick={handleLogout} />
        </li>


      </ul>

    </Wrapper>
  );
};

export default Navbar;
