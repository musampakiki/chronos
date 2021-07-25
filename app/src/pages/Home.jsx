import React, {useState} from 'react';
import moment from "moment";

import {CalendarBar} from "../components/CalendarBar";
import {CalendarGrid} from "../components/Calendar";
import styled from "styled-components";




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

function Home() {

    moment.updateLocale('en', {week: {dow: 1}});
    // const today = moment();
    const [today, setToday] = useState(moment())
    const startDay = today.clone().startOf('month').startOf('week');

    // window.moment = moment;

    const prevHandler = () => setToday(prev => prev.clone().subtract(1, 'month'));
    const todayHandler = () => setToday(moment())
    const nextHandler = () => setToday(prev => prev.clone().add(1, 'month'))
    return (
        <StyledHome>
            <ShadowWrapper>
                <CalendarBar
                    today={today}
                    prevHandler={prevHandler}
                    todayHandler={todayHandler}
                    nextHandler={nextHandler}
                />
                <CalendarGrid startDay={startDay} />
            </ShadowWrapper>
        </StyledHome>
    );
}

export default Home;
