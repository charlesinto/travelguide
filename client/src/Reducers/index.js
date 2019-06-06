import { combineReducers } from 'redux';
import homeReducer from "./homeReducers";
import viewRidesReducer from "./viewRidesReducer";
import confrimRidesPageReducers from "./confrimRidesPageReducers";

export default combineReducers({
    menu: homeReducer,
    rides: viewRidesReducer,
    selectedRide: confrimRidesPageReducers
})