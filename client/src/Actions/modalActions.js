import { MODAL_ACTIONS } from "./types";


const modal = (type = '', details = '') => {
    return {
        type: MODAL_ACTIONS,
        payload: { type, details }
    }
}

export {
    modal
}