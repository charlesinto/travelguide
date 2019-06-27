import { PREFERENCES_SELECTED, FETCH_BOOK_STATE,INIT_SEATS, UPDATE_STATE } from "./types";

const bookTrip = (tripPreference) => {
    sessionStorage.setItem("preference", JSON.stringify(tripPreference))
    return {
        type: PREFERENCES_SELECTED,
        payload: tripPreference
    }
}

const fetchState = (state) => {
    return {
        type: FETCH_BOOK_STATE,
        payload: state
    }
}

const initSeats = () => {
    return {
        type : INIT_SEATS,
        payload: ''
    }
}

const updateState = (formdata) => {
    return {
        type: UPDATE_STATE,
        payload: formdata
    }
}
export {
    bookTrip,
    fetchState,
    updateState,
    initSeats
}

