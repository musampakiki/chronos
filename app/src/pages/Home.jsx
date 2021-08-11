import React, {useEffect} from 'react';
import styled from "styled-components";

import {useDispatch, useSelector} from "react-redux";
import {getTasks} from "../reducers/tasksReducer";
import Calendar from "../components/Calendar";



export const StyledHome = styled.div`
  padding: 1rem;
  width: 100%;
  margin: 0 auto;
  h2 {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 1093px) {
    width: 95%;
  }

  @media screen and (max-width: 1090px) {
    width: 99%;
  }

  @media screen and (max-width: 870px) {
    width: 90%;
  }

  @media screen and (max-width: 670px) {
    width: 99%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }

  @media screen and (max-width: 530px) {
    width: 100%;
  }
`;
const ShadowWrapper = styled('div')`
  overflow:hidden;
`;
const StyleCalendar = styled('div')`
  * {
    margin: 0;
    padding: 0;
    //font-family: "Montserrat Alternates", sans-serif;
  }

  button {
    cursor: pointer;
  }

  label {
    display: block;
  }

  textarea {
    width: 90%;
    margin-left: 1rem;
  }

  input:focus,
  select:focus,
  button:focus,
  input:focus {
    outline: none;
  }

  a {
    color: #444444;
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  .container {
    padding: 0 5%;
  }

  .text-shadow {
    text-shadow: 2px 2px 4px #444444;
  }

  .box-shadow {
    -webkit-box-shadow: 2px 2px 5px #444444;
    box-shadow: 2px 2px 5px #444444;
  }

  .navbar {
    height: 70px;
    padding: 0 5%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: flex-end;
  }

  .navbar .logo p,
  .navbar .logo span {
    //font-family: "Merienda", cursive;
    font-size: 1.8rem;
    color: #999999;
  }

  .navbar .logo p {
    color: rgba(80, 120, 250, 1);
  }

  .navbar .logo a {
    font-size: 1rem;
    //font-family: "Merienda", cursive;
  }

  .navbar .button-group button {
    background-color: rgba(80, 120, 250, 1);
    border: none;
    font-size: 1.2rem;
    padding: 0.4rem;
    color: #999999;
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
    margin-right: 1rem;
  }

  .navbar .button-group button:last-child {
    margin-right: 50px;
  }

  .navbar .button-group button:hover {
    background-color: rgba(220, 220, 220, 0.9);
    color: rgba(80, 120, 250, 1);
  }

  .calendar {
    margin: 0.5rem 0;
  }

  .calendar .title {
    color: #fff;
    background-color: #020202;
    padding: 0.3rem;
    font-size: 1.5rem;
    position: relative;
  }

  .calendar .title button {
    font-size: 1.5rem;
    background: none;
    border: none;
    color: #999999;
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }

  .calendar .title button:hover {
    color: #444444;
  }

  .calendar .title .edit-date-btn {
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }

  .calendar .title .edit-date-btn.toggled {
    color: #cc0000;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }

  .calendar .title .buttons button {
    background: none;
    border: none;
    font-size: 2rem;
    color: #999999;
    position: absolute;
    top: calc(50% - 1rem);
    -webkit-transition: 0.3s ease-in-out;
    transition: 0.3s ease-in-out;
  }

  .calendar .title .buttons button:hover {
    color: #444444;
  }

  .calendar .title .buttons .prev-btn {
    right: 4rem;
  }

  .calendar .title .buttons .next-btn {
    right: 1rem;
  }

  .calendar .title .dropdown-jump {
    background-color: rgba(80, 120, 250, 1);
    width: 100%;
    padding: 1rem 0;
    display: none;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: absolute;
    left: 0;
    top: 76px;
    z-index: 1;
  }

  .calendar .title .dropdown-jump select,
  .calendar .title .dropdown-jump input,
  .calendar .title .dropdown-jump button {
    width: 150px;
    height: 2rem;
    font-size: 1.2rem;
    background-color: #999999;
    border: none;
    text-align: center;
    margin-right: 0.5rem;
  }

  .calendar .title .dropdown-jump button {
    margin-right: 0;
    background-color: #444444;
  }

  .calendar .title .dropdown-jump button:hover {
    color: #999999;
  }

  .calendar .title .dropdown-jump.toggled {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
  }

  .calendar .calendar-table .thead,
  .calendar .calendar-table .thead-sm,
  .calendar .calendar-table .tbody {
    display: -ms-grid;
    display: grid;
    -ms-grid-columns: (1fr)[7];
    grid-template-columns: repeat(7, 1fr);
    gap: 0.5rem;
    text-align: center;
  }

  .calendar .calendar-table .thead,
  .calendar .calendar-table .thead-sm {
    font-weight: bold;
    padding: 0.3rem 0;
  }

  .calendar .calendar-table .thead-sm {
    display: none;
  }

  .calendar .calendar-table .tbody .day {
    background-color: #020202;
    border: none;
    color: #fff;
    height: 90px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    padding: 0.5rem;
    align-items: start;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: flex-end;
    font-size: 1rem;
    position: relative;
  }

  .calendar .calendar-table .tbody .day div {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-top: 2px;
  }

  .calendar .calendar-table .tbody .day div span {
    font-size: 0.8rem;
  }


  .calendar .calendar-table .tbody .day div span i.Birthday {
    color: #18a5af;
  }

  .calendar .calendar-table .tbody .day div span div.Birthday {
    color: #acf3f8;
    background: linear-gradient(#e76202, #532401);
    margin-top: 50px;
  }

  .calendar .calendar-table .tbody .day div span i.Conference {
    color: #4dad27;
  }

  .calendar .calendar-table .tbody .day div span div.Conference {
    color: #c9ff06;
    background: linear-gradient(#57a702, #2b5301);
    margin-top: 50px;

  }

  .calendar .calendar-table .tbody .day div span i.Meeting {
    color: #962828;
  }

  .calendar .calendar-table .tbody .day div span div.Meeting {
    color: #ffffff;
    background: linear-gradient(#ff006a, #2b0113);
    margin-top: 50px;

  }

  .calendar .calendar-table .tbody .day div span i.Meet {
    color: #e28d1d;
  }

  .calendar .calendar-table .tbody .day div span div.Meet {
    color: #e28d1d;
    background: linear-gradient(#1900ff, #06012f);
    margin-top: 50px;

  }

  .calendar .calendar-table .tbody .day div span div.task {
    color: #ffffff;
    background: linear-gradient(#025327, #00180a);
    margin-top: 30px;

  }


  .calendar .calendar-table .tbody .day:hover {
    background-color: rgba(220, 220, 220, 0.9);
    color: #444444;
  }

  .calendar .calendar-table .tbody .day.hidden {
    visibility: hidden;
  }

  .calendar .calendar-table .tbody .day.current-day {
    background-color: #121212;
  }

  .calendar .sidebar__close-btn {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 0.5rem;
    right: 0.8rem;
    font-size: 2rem;
    background: none;
    border: none;
    color: #444444;
    z-index: 1;
  }

  .calendar .sidebar__close-btn:hover {
    color: #707070;
    -webkit-transform: rotateZ(360deg);
    transform: rotateZ(360deg);
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  .calendar .detail-sidebar {
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    position: absolute;
    left: 200%;
    width: 40%;
    height: 70%;
    padding-left: 1rem;
    background-size: cover;
    overflow-y: scroll;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    background-color: rgba(220, 220, 220, 1);
  }

  .calendar .detail-sidebar .detail-sidebar__date {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0 2rem 0;
    position: relative;
    color: rgba(80, 120, 250, 1);
  }

  //centre day event
  .calendar .detail-sidebar .detail-sidebar__date::before {
    content: "";
    position: absolute;
    bottom: -16px;
    left: 0;
    width: 100%;
    height: 4px;
    //background-color: #755c8a;
    background-color: #cc0000;
  }

  .calendar .detail-sidebar .detail-sidebar__events {
    color: #444444;
    margin: 1rem;
  }

  .calendar .detail-sidebar .detail-sidebar__events button {
    background: none;
    border: none;
    float: right;
    font-size: 1.3rem;
  }

  .calendar .detail-sidebar .detail-sidebar__events .delete-event-btn {
    color: #cc0000;
    margin-left: 1rem;
  }

  .calendar .detail-sidebar .detail-sidebar__events .edit-event-btn {
    color: #444444;
  }

  .calendar .detail-sidebar .detail-sidebar__events li {
    overflow: hidden;
    padding: 1rem;
    font-size: 1.3rem;
    color: #444444;
    transition: height 0.5s;
  }
  .calendar .detail-sidebar .detail-sidebar__events li span{
    margin:0 1rem;
    ma
  }
  
  .active {
    height: 200px !important;
  }

  .event-date {
    margin-top: 20px;
  }

  .event-item:hover {
    cursor: pointer;
  }

  .calendar .detail-sidebar .detail-sidebar__events li:nth-child(even) {
    background-color: rgba(220, 220, 220, 0.9);
  }

  .calendar .detail-sidebar .detail-sidebar__link {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  .calendar .detail-sidebar .detail-sidebar__link span {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .calendar .detail-sidebar .detail-sidebar__link:hover {
    color: #444444;
  }

  .calendar .detail-sidebar.toggled {
    left: 0;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
  }

  .calendar .new-event-sidebar {
    position: absolute;
    left: -100%;
    width: 40%;
    height: 90vh;
    padding-left: 1rem;
    background-size: cover;
    -webkit-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
    background-color: rgba(56,52,51, 1);
  }

  .calendar .new-event-sidebar .new-event-sidebar__title {
    font-size: 2rem;
    font-weight: bold;
    margin: 1rem 0 2rem 0;
    position: relative;
    color: #fff;
  }

  .calendar .new-event-sidebar .new-event-sidebar__title::before {
    content: "";
    position: absolute;
    bottom: -16px;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: rgba(204,0,0, 1);
  }

  .calendar .new-event-sidebar label {
    font-weight: bold;
    margin-left: 1rem;
    color: #fff;
  }

  .calendar .new-event-sidebar .new-event-sidebar__description,
  .calendar .new-event-sidebar .new-event-sidebar__date,
  .calendar .new-event-sidebar .new-event-sidebar__type,
  .calendar .new-event-sidebar .new-event-sidebar__reminder,
  .calendar .new-event-sidebar .new-event-sidebar__add-btn {
    width: 90%;
    font-size: 1.3rem;
    margin: 0.5rem 1rem;
    padding: 0.5rem 0;
    color: #fff;
    border: 2px solid rgba(18,18,18, 1);
    -webkit-box-sizing: border-box;
    background-color: rgba(18,18,18, 1);
    box-sizing: border-box;
    z-index: 999999;
  }

  .calendar .new-event-sidebar .new-event-sidebar__add-btn {
    background-color: #cc0000;
    color: #fff;
  }

  .calendar .new-event-sidebar .new-event-sidebar__add-btn:hover {
    background-color: rgba(80, 120, 250, 1);
    -webkit-transition: 0.3s;
    transition: 0.3s;
  }

  .calendar .new-event-sidebar.toggled {
    left: 30%;
    -webkit-transition: 0.5s ease-in-out;
    transition: 0.5s ease-in-out;
  }

  .text-bold {
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    .navbar .logo p,
    .navbar .logo span {
      font-size: 1.5rem;
    }

    .navbar .button-group button {
      font-size: 1rem;
      padding: 0.2rem;
      margin-right: 0;
    }

    .new-event-sidebar.toggled,
    .detail-sidebar.toggled {
      padding-left: 0;
      width: 100%;
    }

    .calendar .title {
      font-size: 1.5rem;
    }

    .calendar .title .dropdown-jump {
      top: 67px;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .calendar .title .dropdown-jump select,
    .calendar .title .dropdown-jump input,
    .calendar .title .dropdown-jump button {
      width: 280px;
      margin-right: 0;
      margin-bottom: 0.4rem;
    }

    .calendar .title .dropdown-jump button {
      margin-bottom: 0;
    }

    .calendar .calendar-table .thead,
    .calendar .calendar-table .thead-sm,
    .calendar .calendar-table .tbody {
      gap: 0.2rem;
    }

    .calendar .calendar-table .thead {
      display: none;
    }

    .calendar .calendar-table .thead-sm {
      display: -ms-grid;
      display: grid;
    }

    .calendar .calendar-table .tbody .day {
      font-size: 1.5rem;
      height: 60px;
    }

    .calendar .calendar-table .tbody .day div {
      margin: 0;
    }

    .calendar .calendar-table .tbody .day div span {
      font-size: 0.7rem;
    }
  }

`;





function Home() {
    const dispatch = useDispatch();
    const { isFetching, tasks } = useSelector((state) => state.tasksReducer);

        useEffect(() => {
            dispatch(getTasks());
        }, [dispatch, tasks]);

    if (isFetching) {
        return (<h2>Load...</h2>)
    }
    if (!isFetching) {
        return (
            <StyledHome>
                <ShadowWrapper>


                    <StyleCalendar>

                        <div className="container">
                            <Calendar />
                        </div>
                    </StyleCalendar>


                </ShadowWrapper>
            </StyledHome>
        );
    }
}
export default Home;
