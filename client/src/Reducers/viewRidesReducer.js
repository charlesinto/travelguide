import { FETCH_RIDES, FETCH_ROUTES, NOT_FOUND, SEAT_SELECTED,INIT_SEATS, RESET_LOADING_TO_TRUE } from "../Actions/types";

const INITIAL_STATE = {
    rides: [],
    loading: true,
    routes: [],
    bookedseats: [],
    seats: [],
}

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case FETCH_RIDES:
            return { ...state }
        case INIT_SEATS:
            return {...state, seats:[]}
        case FETCH_ROUTES:
            return { ...state, loading: false, routes: actions.payload.trips, bookedseats: actions.payload.bookedSeats }
        case NOT_FOUND:
            return { ...state, loading: false }
        case RESET_LOADING_TO_TRUE:
            return { ...state, loading: true }
        case SEAT_SELECTED:
            return enqueDequeSeats(state, actions.payload)
        default:
            return state;
    }
}

const enqueDequeSeats = (state, seatnumber) => {
    const bookedseats = state.seats
    const indexOfSeat = bookedseats.indexOf(seatnumber)
    if (indexOfSeat !== -1) {
        bookedseats.splice(indexOfSeat, 1)
        sessionStorage.setItem('seats', JSON.stringify(bookedseats))
        return { ...state, seats: [...bookedseats] }
    }
    const seats = [...bookedseats, seatnumber]
    sessionStorage.setItem('seats', JSON.stringify(seats))
    return { ...state, seats: seats }
}