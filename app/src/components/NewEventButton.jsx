import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, clearEventField, addEventDate, toggleEventsSidebarObj, toggleNewEventSidebarObj, toggleDetailSidebarObj } from "../actions/actionCreatorsObj";
import { ControlPoint } from '@material-ui/icons';

const NewEventButton = ({ date }) => {

  const calendarContext = useSelector(state => state.calendarState);
  const dispatch = useDispatch();

  const {
    newEventSidebarToggled,
    eventDate,
    days
  } = calendarContext;

  const dispatchEditEventDate = () => {
    dispatch(addEventDate(date))
    dispatch(changeServiceField('date', days[eventDate].date))
  }

  return (
    <nav className="navbar">
      <div className="button-group">
        <button
          className="new-event-btn"
          onClick={() => {
            dispatch(toggleNewEventSidebarObj(!newEventSidebarToggled));
            dispatch(toggleEventsSidebarObj(false));
            dispatch(toggleDetailSidebarObj(false))
            dispatch(clearEventField())
            date ? dispatchEditEventDate() : dispatch(addEventDate(null))
          }}
        >
          <ControlPoint/>New Task
        </button>
      </div>
    </nav>
  );
};

export default NewEventButton;
