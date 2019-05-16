import { RIDE_SELECTED, FETCH_RIDES } from "./types";

const rideSelected = (ride) => {
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

export {
    rideSelected,
    fetchRides
}