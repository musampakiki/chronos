import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { prevMonthDispatch, nextMonthDispatch } from "../actions/actionCreatorsDispatch"
import { NavigateBefore, NavigateNext } from '@material-ui/icons';

const ButtonsCalendar = () => {

  const calendarContext = useSelector(state => state.calendarState);

  const dispatch = useDispatch();

  return (
    <div className="buttons">
      <button
        className="prev-btn"
        onClick={() => {
          dispatch(prevMonthDispatch(calendarContext));
        }}
      >
        <NavigateBefore />
      </button>
      <button
        className="next-btn"
        onClick={() => {
          dispatch(nextMonthDispatch(calendarContext));
        }}
      >

        <NavigateNext />

      </button>
    </div>
  );
};

export default ButtonsCalendar;
