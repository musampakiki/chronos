import React, {useEffect, useState} from 'react';
import { useDispatch} from "react-redux";
import moment from "moment";

import {CalendarBar} from "../components/CalendarBar";
import {CalendarGrid} from "../components/CalendarDark";
import styled from "styled-components";
import {getTasks} from "../reducers/tasksReducer";




export const StyledHome = styled.div`
  padding: 1rem;
  width: 100%;
  margin: 0 auto;
  padding-bottom: 7rem;

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

function HomeDark() {
    const dispatch = useDispatch();
    // const { tasks } = useSelector((state) => state.tasksReducer);

    moment.updateLocale('en', {week: {dow: 1}});
    // const today = moment();
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');

    // let listOfUserGroups = [...new Set(users.map(it => it.group))];


    // const [start, setStart] = useState([task.dataCreated])

    // window.moment = moment;

    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'))

    // const [tasks, setTasks] = useState([])


    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);




    return (
        <StyledHome>
            <ShadowWrapper>
                <CalendarBar
                    today={today}
                    prevHandler={prevHandler}
                    todayHandler={todayHandler}
                    nextHandler={nextHandler}
                />
                <CalendarGrid startDay={startDay}  today={today}/>
            </ShadowWrapper>
        </StyledHome>
    );
}

export default HomeDark;
