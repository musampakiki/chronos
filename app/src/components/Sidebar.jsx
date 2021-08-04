import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { Home, Today, DateRange, FilterList } from '@material-ui/icons';
// import {
//   HomeIcon,
// // TrendingIcon,
// // SubIcon,
// // LibIcon,
// // HistoryIcon,
// // VidIcon,
// // LikeIcon,
// // PostIcon,
// } from "./Icons";
import { closeSidebar } from "../reducers/sidebar";
// import Colors from "./Colors"

const SidebarWrapper = styled.div`
  position: fixed;
  top: 55px;
  left: 0;
  height: 100vh;
  width: 240px;
  background: ${(props) => props.theme.grey};
  padding-top: 1rem;
  overflow: auto;
  padding-bottom: 1.5rem;
  transition: all 0.3s;
  z-index: 2;

  &::-webkit-scrollbar {
    width: 0;
  }

  .icon {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    padding-left: 1.5rem;
    margin-bottom: 0.4rem;
  }

  .icon:not(.hover-disable):hover {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active div {
    background: ${(props) => props.theme.darkGrey};
    cursor: pointer;
  }

  .active svg {
    fill: #fff;
  }

  .icon span {
    padding-left: 1rem;
    position: relative;
    top: 1px;
  }

  @media screen and (max-width: 1093px) {
    transform: translateX(-100%);

    ${(props) =>
      props.open &&
      css`
        transform: translateX(0);
      `}
  }
`;

const Sidebar = () => {
  const dispatch = useDispatch();

  const { sidebar: open } = useSelector((state) => state.sidebar);

  const handleCloseSidebar = () => {
    dispatch(closeSidebar());
  };
  return (
    <SidebarWrapper open={open}>
      <NavLink
        onClick={handleCloseSidebar}
        exact
        to="/"
        activeClassName=""
      >
        <div className="icon">
          <Home />
          <span>Home</span>
        </div>
      </NavLink>
        <div className="ruler"></div>
      <NavLink
            onClick={handleCloseSidebar}
            to="/#"
            activeClassName=""
        >
            <div className="icon">
                <Today />
                <span>Today</span>
            </div>
      </NavLink>
      <NavLink
        onClick={handleCloseSidebar}
        to="/test"
        activeClassName=""
      >
        <div className="icon">
          <DateRange />
          <span>Сoming</span>
        </div>
      </NavLink>
        <div className="ruler"></div>
      {/*<NavLink*/}
      {/*  onClick={handleCloseSidebar}*/}
      {/*  to="/feed/subscriptions"*/}
      {/*  activeClassName="active"*/}
      {/*>*/}
      {/*  <div className="icon">*/}
      {/*    <SubIcon />*/}
      {/*    <span>Subscriptions</span>*/}
      {/*  </div>*/}
      {/*</NavLink>*/}

        <NavLink
            onClick={handleCloseSidebar}
            to="/colors"
            activeClassName="active"
        >
            <div className="icon">
                <DateRange />
                <span>Colors</span>
            </div>
        </NavLink>
        <NavLink
            onClick={handleCloseSidebar}
            to="/lists"
            activeClassName="active"
        >
            <div className="icon">
                <DateRange />
                <span>Lists</span>
            </div>
        </NavLink>
        <NavLink
            onClick={handleCloseSidebar}
            to="/tasks"
            activeClassName="active"
        >
            <div className="icon">
                <DateRange />
                <span>Tasks</span>
            </div>
        </NavLink>

      <div className="ruler"></div>



      {/*<NavLink*/}
      {/*  onClick={handleCloseSidebar}*/}
      {/*  to="/feed/history"*/}
      {/*  activeClassName="active"*/}
      {/*>*/}
      {/*  <div className="icon">*/}
      {/*    <HistoryIcon />*/}
      {/*    <span>History</span>*/}
      {/*  </div>*/}
      {/*</NavLink>*/}

      {/*<NavLink*/}
      {/*  onClick={handleCloseSidebar}*/}
      {/*  to="/feed/my_articles"*/}
      {/*  activeClassName="active"*/}
      {/*>*/}
      {/*  <div className="icon">*/}
      {/*    <VidIcon />*/}
      {/*    <span>Your articles</span>*/}
      {/*  </div>*/}
      {/*</NavLink>*/}

      <NavLink
        onClick={handleCloseSidebar}
        to="/#"
        activeClassName=""
      >
        <div className="icon">
          <FilterList />
          <span>Filter</span>
        </div>
      </NavLink>


      <div className="ruler"></div>

      {/*<Subscriptions />*/}
    </SidebarWrapper>
  );
};

export default Sidebar;
