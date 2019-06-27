import { RIDE_SELECTED, PREFERENCES_SELECTED, FETCH_BOOK_STATE, MODAL_ACTIONS, UPDATE_STATE } from "../Actions/types";

const INITIAL_STATE = {
    selectedRide: {},
    preferences: {},
    formdata: {},
    modal: '',
    modalDetails: ''
}
export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case FETCH_BOOK_STATE:
            const {payload: { rideDetail: {seats }}} = actions;
            console.log(seats)
            const newFormData = fillContactDetails(seats.length, state);
            return {
                ...state,
                selectedRide: actions.payload.tripPreferences,
                preferences: actions.payload.rideDetail,
                formdata: newFormData
            }
        case PREFERENCES_SELECTED:
            return { ...state, preferences: actions.payload }
        case RIDE_SELECTED:
            return { ...state, selectedRide: actions.payload }
        case UPDATE_STATE:
            return { ...state, formdata: actions.payload }
        case MODAL_ACTIONS:
            return { ...state, modal: actions.payload.type, modalDetails: actions.payload.details }
        default:
            return state;
    }
}

const fillContactDetails = (numberOfPassengers, state) => {
    const numberOfSeats = parseInt(numberOfPassengers);
    const formdata = { ...state.formdata };
    for (let i = 0; i < numberOfSeats; i++) {
        formdata[`keys-${i}-name`] = {
            element: 'input',
            value: '',
            config: {
                label: 'To:',
                name: `number_o_${i}_input`,
                type: 'text',
                placeholder: 'Enter full name'
            },
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
            showLabel: false
        }
        formdata[`keys-${i}-email`] = {
            element: 'input',
            value: '',
            config: {
                label: 'To:',
                name: `number_o_${i}_input`,
                type: 'email',
                placeholder: 'Enter Email Address'
            },
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
            showLabel: false
        }
        formdata[`keys-${i}-contact`] = {
            element: 'input',
            value: '',
            config: {
                label: 'To:',
                name: `number_o_${i}_input`,
                type: 'number',
                placeholder: 'Enter Contact Number'
            },
            validation: {
                required: true,
            },
            valid: false,
            validationMessage: '',
            showLabel: false
        }

    }
    return formdata
}