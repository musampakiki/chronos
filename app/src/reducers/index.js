import { combineReducers } from "redux";

// reducers
import user from "./user";
import profile from "./profile";
import sidebar from "./sidebar";
import searchResult from "./searchResult";
import listReducer from "./listReducer";
import listsReducer from "./listsReducer";
import taskReducer from "./taskReducer";
import tasksReducer from "./tasksReducer";
import history from "./history";
import colorReducer from "./colorReducer";
import colorsReducer from "./colorsReducer";


export default combineReducers({
  user,
  profile,
  sidebar,
  searchResult,
  taskReducer,
  tasksReducer,
  listReducer,
  listsReducer,
  history,
  colorReducer,
  colorsReducer,
});





