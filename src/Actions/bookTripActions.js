import { PREFERENCES_SELECTED } from "./types";

const bookTrip = (tripPreference) => {
    return {
        type: PREFERENCES_SELECTED,
        payload: tripPreference
    }
}

export {
    bookTrip
}

