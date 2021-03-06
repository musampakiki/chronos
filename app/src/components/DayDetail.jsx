import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Delete, Cancel, Edit } from '@material-ui/icons';
import { deleteEventDispatch } from "../actions/actionCreatorsDispatch";
import NewEventButton from "./NewEventButton";
import { editEventSidebarObj, setDayDetailObj, toggleDetailSidebarObj, toggleNewEventSidebarObj } from "../actions/actionCreatorsObj";
import moment from 'moment';
import Button from "../styles/Button";
// import {getTasks} from "../reducers/tasksReducer";


const DayDetail = () => {

  const calendarContext = useSelector(state => state.calendarState);

  const dispatch = useDispatch()




  const {
    detailSidebarToggled,
    dayDetail,
    currentMonth,
    currentYear,
  } = calendarContext;

  const fullEvent = (el) => {
    el.classList.toggle('active')
  }



  return (
    <div
      className={
        detailSidebarToggled
          ? "detail-sidebar toggled box-shadow"
          : "detail-sidebar"
      }
      style={{
        top: window.scrollY
      }}
    >
      <button
        className="sidebar__close-btn"
        onClick={() => {
          dispatch(toggleDetailSidebarObj(false));
          dispatch(toggleNewEventSidebarObj(false));
        }}
      >
        <Cancel/>
      </button>
      <p className="detail-sidebar__date">{`${moment.months(currentMonth - 1)} ${dayDetail.today}, ${currentYear}`}</p>
      <ul className="detail-sidebar__events">
        {dayDetail.events.map(event => (
          <li
            className="event-item"
            onClick={(e) => fullEvent(e.target)}
            key={event.id + event.name}>
            <p><span className="text-bold">{event.participants}</span>: {event.eventName}</p>
            <p>
              <span className="text-bold">Date: </span>
              {event.date}
           </p>

            <p><span className="text-bold">Time: </span>{event.time}</p>
            <p><span className="text-bold">Description: </span>{event.description}</p>


            <button
              className="delete-event-btn"
              onClick={() => {
                dispatch(deleteEventDispatch(calendarContext, event.id));
                dispatch(setDayDetailObj(
                  dayDetail.today,
                  dayDetail.events.filter(e => e.id !== event.id)
                ));
              }}
            >
              <Delete />
            </button>
            <button
              className="edit-event-btn"
              onClick={() => {
                dispatch(toggleNewEventSidebarObj(true));
                dispatch(toggleDetailSidebarObj(false))
                dispatch(editEventSidebarObj(event))
              }}
            >
              <Edit />
            </button>

          </li>

        ))}

          </ul>

      <div>
        <NewEventButton date={dayDetail.today} />
      </div>
    </div>
  );
};

export default DayDetail;
