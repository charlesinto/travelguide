import { PREFERENCES_SELECTED, FETCH_BOOK_STATE,INIT_SEATS,
     UPDATE_STATE, ERROR_PROCESSING_TRIP,SUCCESS_PROCESS_TRIP
     } from "./types";
import axios from "axios";

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

const processForm = async (paymentType, travellerDetails, tripSelected, seats) => {
    console.log({paymentType, travellerDetails, tripSelected, seats})
    return async (dispatch) => {
        try{
            const response = await axios.post('/api/v1/register_trip', {
                paymentType, travellerDetails, tripSelected,seats
            })
            console.log(response)
            dispatch({
                type: SUCCESS_PROCESS_TRIP,
                payload: response,
            })
        }catch(error){
            dispatch({
                type: ERROR_PROCESSING_TRIP,
                payload: error
            })
        }
    }
}

export {
    bookTrip,
    fetchState,
    updateState,
    initSeats,
    processForm
}

