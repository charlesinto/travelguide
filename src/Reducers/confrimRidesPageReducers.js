import { RIDE_SELECTED, PREFERENCES_SELECTED } from "../Actions/types";

const INITIAL_STATE = {
    selectedRide: {},
    preferences: {}
}
export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case PREFERENCES_SELECTED:
            return { ...state, preferences: actions.payload }
        case RIDE_SELECTED:
            return { ...state, selectedRide: actions.payload }
        default:
            return state;
    }
}