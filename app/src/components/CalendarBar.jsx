import React from "react";
import styled from "styled-components";

const DivWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  background-color: #1E1F21;
	color: #DCDDDD;
	padding: 16px;
`;

const TextWrapper = styled('span')`
  font-size: 32px;
`;

const TitleWrapper = styled(TextWrapper)`
  font-weight: bold;
  margin-right: 28px;
`;

const ButtonsWrapper = styled('div')`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled('button')`
  border: unset;
	background-color: #2d2d35;
	height: 20px;
	width: 20px;
	margin-right: 2px;
	border-radius: 4px;
	color: #FFFFFF;
	outline: unset;
	cursor:pointer;
`;

const TodayButton = styled(ButtonWrapper)`
  padding-right: 16px;
  width: 80px;
	padding-left: 16px;
`;

const CalendarBar = ({today,prevHandler,todayHandler,nextHandler}) => (
    <DivWrapper>
        <div>
            <TitleWrapper>{today.format('MMMM')}</TitleWrapper>
            <TextWrapper>{today.format('YYYY')}</TextWrapper>
        </div>
        <ButtonsWrapper>
            <ButtonWrapper onClick={prevHandler}> &lt; </ButtonWrapper>
            <TodayButton onClick={todayHandler}>Today</TodayButton>
            <ButtonWrapper onClick={nextHandler}> &gt; </ButtonWrapper>
        </ButtonsWrapper>
    </DivWrapper>
);

export { CalendarBar };
