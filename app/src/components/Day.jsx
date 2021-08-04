import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setDayDetailObj, addEventDate, toggleDetailSidebarObj, toggleEventsSidebarObj, toggleNewEventSidebarObj } from "../actions/actionCreatorsObj";
import moment from 'moment'


const Day = ({ day: { visible, dayOfMonth, date } }) => {

  const calendarContext = useSelector(state => state.calendarState);
  const {tasks} = useSelector(state => state.tasksReducer);

  const dispatch = useDispatch()


  const {
    events,
    starts = [...new Set(tasks.map(task => task))],
  } = calendarContext;

  let todayEvents = [];
  let todayTasks = [];


  events.forEach(event => {
      let eventStart = event.date

    if (date === eventStart) {
      todayEvents.push(event);
    }
  });

    starts.forEach(start => {
        let dateStart = moment(start.dataCreated).format('YYYY-MM-DD')

        if (date === dateStart) {
            todayTasks.push(start);
        }
    });


  const today = moment().format('YYYY-MM-DD')
  let cn = "day";
  if (today === date) cn = "day current-day";

  if (!visible) cn = "day hidden";



  return (
    <button
      className={cn}
      onClick={() => {
        dispatch(setDayDetailObj(dayOfMonth, todayEvents, todayTasks))
        dispatch(toggleDetailSidebarObj(true));
        dispatch(toggleEventsSidebarObj(false));
        dispatch(toggleNewEventSidebarObj(false));
        dispatch(addEventDate(dayOfMonth))
      }}
    >
      {dayOfMonth}
      <div>
        {todayEvents.map((el, index) => (
          <span key={index} el={el}>
            {" "}
              <div className={`${el.participants}`}>task for {el.participants}: {el.eventName}</div>
          </span>
        ))}

          {todayTasks.map((start, index) => (
              <span key={index} el={start}>
            {" "}
                  <div className={'task'}>{start.title}</div>
          </span>
          ))}

      </div>
    </button>
  );
};

export default Day;
