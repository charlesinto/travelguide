import {
    RIDE_SELECTED, FETCH_RIDES, FETCH_ROUTES, RESET_LOADING_TO_TRUE,
    NOT_FOUND, SEAT_SELECTED
} from "./types";
import axios from "axios";

const rideSelected = (ride) => {
    sessionStorage.setItem('selectedRide', JSON.stringify(ride));
    return {
        type: RIDE_SELECTED,
        payload: ride
    }
}

const fetchRides = () => {
    return {
        type: FETCH_RIDES,
        payload: ''
    }
}
const resetLoading = () => {
    return {
        type: RESET_LOADING_TO_TRUE,
        payload: ''
    }
}
const get_avialableTrips = async (location) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('/api/v1/trips/available_trips', location)

            const { data: { trips, bookedSeats } } = response;
            dispatch({
                type: FETCH_ROUTES,
                payload: { trips, bookedSeats }
            })
        } catch (err) {
            console.log('error', err)
        } finally {
            dispatch({
                type: NOT_FOUND,
                payload: ''
            })
        }

    }
}

const seatSelected = (seatnumber) => {
    return {
        type: SEAT_SELECTED,
        payload: seatnumber
    }
}

export {
    rideSelected,
    fetchRides,
    get_avialableTrips,
    resetLoading,
    seatSelected
}