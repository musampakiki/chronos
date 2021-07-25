import React from "react";
import moment from "moment";
import styled from 'styled-components';

import {Link} from "react-router-dom";
import {ControlPoint} from "@material-ui/icons";



const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
  //grid-template-rows: repeat(6, 1fr);
  grid-gap: 1px;
  background-color: ${props => props.isHeader ? '#141518' : '#4D4C4D'};
  ${props => props.isHeader && 'border-bottom: 1px solid #4D4C4D' };
`;

const CellWrapper = styled.div`
	min-height: ${props => props.isHeader ? '20px' : '70px'};
	min-width: 140px;
    background-color: ${props => props.isWeekday ? '#2d2d35' : props => props.isCurrentDay ? '#0b1629' : '#141518'};
	box-shadow: ${props => props.isCurrentDay ? '0 0 8px #03318d' : 'none'};
	color: ${props => props.isWeekday ? '#2d2d35' : props => props.isCurrentDay ? '#0b1629' : props => props.isHeader ? '#ffffff' : '#141518'};
	
`;

const RowInCell = styled.div`
	display: flex;
	justify-content: ${props => props.justifyContent ? props.justifyContent : 'flex-start'};
	${props => props.pr && `padding-right: ${props.pr * 10}px`}
`;

const DayWrapper = styled.div`
	height: 31px;
	width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  color: #666;
;`

const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;
const SelectedMonthDay = styled.div`
	height: 31px;
	width: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  color: #fff;
;`


const TaskControl = styled.div`
   margin:20px 25px;
   &:hover {
    ${ControlPoint} {
      color: #ffffff;
    }
`;


const CalendarGrid = ({startDay}) => {
    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())



    const isCurrentDay = (day) => moment().isSame(day, 'day');
    const isSelectedMonth = (day) => moment().isSame(day, 'month');
    console.log('Looking days',day )
    return (
        <>
            <GridWrapper isHeader>
                {[...Array(7)].map((value, index, array) => (<CellWrapper isHeader>
                    <RowInCell justifyContent={'flex-end'} pr={1}>
                        {moment().day(index+1).format('ddd')}
                    </RowInCell>
                </CellWrapper>))}
            </GridWrapper>
            <GridWrapper>
            {
                daysMap.map((dayItem) => (
                    <CellWrapper
                        isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
                        isCurrentDay = {isCurrentDay(dayItem)}
                        key={dayItem.unix()}
                        isSelectedMonth={isSelectedMonth(dayItem)}
                    >
                        <RowInCell justifyContent={'flex-end'}>

                            <Link to="/new_task">
                                <TaskControl>
                                           <ControlPoint />
                               </TaskControl>
                            </Link>
                            <DayWrapper >
                                {!isCurrentDay(dayItem) && !isSelectedMonth(dayItem) && dayItem.format('D')}
                                {isCurrentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                                {isSelectedMonth(dayItem) && !isCurrentDay(dayItem) && <SelectedMonthDay>{dayItem.format('D')}</SelectedMonthDay>}
                            </DayWrapper>

                        </RowInCell>
                    </CellWrapper>
                ))
            }
        </GridWrapper>
        </>
    );
};

export { CalendarGrid };
