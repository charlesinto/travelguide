import Joi from 'joi';
import extensions from "joi-date-extensions";

class ValidationSchema {
    static getAvailableTripSchema() {
        Joi.extend(extensions);
        return Joi.object().keys({
            startterminalid: Joi.number().required(),
            arrivalterminalid: Joi.number().required(),
            depature_date: Joi.date().iso().required(),
        })
    }
    static bookTripSchema() {
        return Joi.object().keys({
            startterminal: Joi.string().required(),
            arrivalterminal: Joi.string().required(),
            number_of_seats: Joi.number().required(),
            companyid: Joi.number().required(),
            start_date: Joi.date().iso().required(),
            routeid: Joi.number().required(),
            carid: Joi.number().required(),
            basefare: Joi.number().required(),
            payment_gateway: Joi.string().required(),
            payment_reference_number: Joi.string().required(),
            total_amount_paid: Joi.number().required(),
            payment_type: Joi.string().required(),
            travellers: Joi.array().min(1).required(),
            seats: Joi.array().min(1).required(),
        })
    }
}

export default ValidationSchema;