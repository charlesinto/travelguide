import { FETCH_RIDES, FETCH_ROUTES, NOT_FOUND, RESET_LOADING_TO_TRUE } from "../Actions/types";

const INITIAL_STATE = {
    rides: [],
    loading: true,
    routes: []
}

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case FETCH_RIDES:
            return { ...state }
        case FETCH_ROUTES:
            return { ...state, loading: false, routes: actions.payload }
        case NOT_FOUND:
            return { ...state, loading: false }
        case RESET_LOADING_TO_TRUE:
            return { ...state, loading: true }
        default:
            return state;
    }
}