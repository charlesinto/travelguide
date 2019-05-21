import { PREFERENCES_SELECTED, FETCH_BOOK_STATE } from "./types";

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

export {
    bookTrip,
    fetchState
}

