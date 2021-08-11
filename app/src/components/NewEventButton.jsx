import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, clearEventField, addEventDate, toggleEventsSidebarObj, toggleNewEventSidebarObj, toggleDetailSidebarObj } from "../actions/actionCreatorsObj";
// import { ControlPoint } from '@material-ui/icons';
import Button from "../styles/Button";
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
        <Button
          className="new-event-btn"
          onClick={() => {
            dispatch(toggleNewEventSidebarObj(!newEventSidebarToggled));
            dispatch(toggleEventsSidebarObj(false));
            dispatch(toggleDetailSidebarObj(false))
            dispatch(clearEventField())
            date ? dispatchEditEventDate() : dispatch(addEventDate(null))
          }}
        >
            NEW EVENT
        </Button>
      </div>
    </nav>
  );
};

export default NewEventButton;
