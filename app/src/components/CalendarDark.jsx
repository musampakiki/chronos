import React, {useEffect} from 'react';
import { useDispatch} from "react-redux";
import moment from "moment";
import styled from 'styled-components';


import {Link} from "react-router-dom";
// import {ControlPoint} from "@material-ui/icons";
import {getTasks} from "../reducers/tasksReducer";



const GridWrapper = styled.div`
	display: grid;
	grid-template-columns: repeat(7, 1fr);
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
/*const EventDay = styled.div`
  position: relative;
  min-height: 6px;
  min-width: 100%;
  margin-bottom:5px;
  margin-left: 0;
  margin-right: 0;
  background: #0f0;

;`*/

/*const TaskControl = styled.div`
   margin:10px 25px;
   &:hover {
    ${ControlPoint} {
      color: #ffffff;
    }
`;*/

/*const event = ({start}) => {

     return (
         <>
                 <EventDay >{`${   moment(start) }`}</EventDay>
         </>
     )
}*/


const CalendarGrid = ({startDay, today}) => {

    const totalDays = 42;
    const day = startDay.clone().subtract(1, 'day');
    const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())

    const isCurrentDay = (day) => moment().isSame(day, 'day');
    console.log('isCurrentDay', isCurrentDay)

    const isSelectedMonth = (day) => today.isSame(day, 'month');



    const dispatch = useDispatch();
    // const { tasks } = useSelector((state) => state.tasksReducer);

    useEffect(() => {
        dispatch(getTasks());
    }, [dispatch]);


    // let start = ''
    // let starts = [...new Set(tasks.map(task => task.dataCreated))]


/*    starts.forEach(function(start, index, starts) {
       starts[index] = start
        console.log('Starts foreach to start', start);

    });
     console.log('Starts foreach to start1', start);*/


  /*  let isEventDay = starts.map(start => {

        console.log(start)
        const EventDay = (day) => moment(start).isSame(day, 'day');
        return EventDay


    });*/

    // console.log('isEventDay ', isEventDay);




    // console.log("looking calendar starts for starts[3]", starts[3],   "end looking calendar")
    // const start = starts[1]
    // console.log("looking calendar start for starts[0]", start,   "end looking calendar")
   /* const isEventDay = (day) => moment(start).isSame(day, 'day');
    console.log("looking calendar isEventDay", isEventDay,   "end looking isEventDay calendar")
*/

    return (
        <>
            <GridWrapper isHeader>
                {[...Array(7)].map((value, index, array) => (<CellWrapper isHeader key={index}>
                    <RowInCell justifyContent={'flex-end'} pr={1}>
                        {moment().day(index + 1).format('ddd')}

                    </RowInCell>
                </CellWrapper>))}
            </GridWrapper>
            <GridWrapper>
                {
                   daysMap.map((dayItem) => (

                        <CellWrapper
                            isWeekday={dayItem.day() === 6 || dayItem.day() === 0}
                            isCurrentDay={isCurrentDay(dayItem)}
                            key={dayItem.unix()}
                            isSelectedMonth={isSelectedMonth(dayItem)}
                           // isEventDay={isEventDay[1](dayItem)}
                        >


                            <RowInCell
                                justifyContent={'flex-end'}
                                // isEventDay={isEventDay (dayItem)}

                                    >

                                    {/*{`${moment(task.dataCreated).isSame(day, 'day')}`}*/}





                                <Link to="/new_task">
                                    {/*<TaskControl>*/}
                                    {/*    <ControlPoint/>*/}
                                    {/*</TaskControl>*/}
                                </Link>

                                    <DayWrapper>
                                        {!isCurrentDay(dayItem) && !isSelectedMonth(dayItem) && dayItem.format('D')}
                                        {isCurrentDay(dayItem) && <CurrentDay>{dayItem.format('D')}</CurrentDay>}
                                        {isSelectedMonth(dayItem) && !isCurrentDay(dayItem) &&
                                        <SelectedMonthDay>{dayItem.format('D')}</SelectedMonthDay>}
                                    </DayWrapper>


                            </RowInCell>

                        {/*  {tasks.map((task) =>
                            <div key={task.id}>


                            <EventDay>
                                {task.title}
                            </EventDay>
                                </div>
                                )}*/}


                        </CellWrapper>


                    ))
                }
            </GridWrapper>
           {/* <div>
                {tasks.map((task, index) => (
                    <p key={index}>{ moment(task.dataCreated).format('D')}</p>
                ))}
            </div>*/}
            {/*<div>*/}
            {/*    {moment(start).format('D')}*/}
            {/*</div>*/}


            {/*<p > { `${moment(starts)}` }</p>*/}

        </>
    );
}

export { CalendarGrid };
