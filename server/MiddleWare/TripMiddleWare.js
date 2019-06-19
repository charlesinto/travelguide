import Joi from "joi";
import ValidationSchema from "./ValidationSchema";
import Moment from "moment";
import Helper from "../Helper";

class TripMiddleWare {
    constructor() {
        this.validateStartAndArrivalTerminalRequest = this.validateStartAndArrivalTerminalRequest.bind(this);
    }

    validateStartAndArrivalTerminalRequest(req, res, next) {
        const { startterminalid, arrivalterminalid, depature_date } = req.body;
        const dateParts = Helper.getDatePart(depature_date);
        const minDatePart = Helper.getDatePart(Helper.getPastDate());
        const maxDatePart = Helper.getDatePart(Helper.getLimitDate());
        if (Moment(`${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`, "YYYY MM DD").isValid()) {
            if (Helper.isDateWithinRange(dateParts, minDatePart, maxDatePart)) {
                return Joi.validate({ startterminalid, arrivalterminalid, depature_date },
                    ValidationSchema.getAvailableTripSchema(), (err, value) => {
                        if (err)
                            return res.status(404).send({ message: 'Bad Requests', err })
                        return next()
                    })
            }
            return res.status(404).send({ message: 'date exception error' })
        }
        return res.status(404).send({ message: 'Bad Requests' })
    }
    validateTripBeforePost(req, res, next) {
        const {
            startterminal, arrivalterminal, number_of_seats, start_date,
            companyid, routeid, carid, basefare, payment_gateway,
            payment_reference_number, total_amount_paid, payment_type,
            travellers, seats
        } = req.body;
        console.log('eloe', start_date);
        const dateParts = Helper.getDatePart(start_date);
        const minDatePart = Helper.getDatePart(Helper.getPastDate());
        const maxDatePart = Helper.getDatePart(Helper.getLimitDate());
        if (Moment(`${dateParts[0]} ${dateParts[1]} ${dateParts[2]}`, "YYYY MM DD").isValid()) {
            if (Helper.isDateWithinRange(dateParts, minDatePart, maxDatePart)) {
                return Joi.validate({
                    startterminal, arrivalterminal, number_of_seats, start_date,
                    companyid, routeid, carid, basefare, payment_gateway,
                    payment_reference_number, total_amount_paid, payment_type,
                    travellers, seats
                },
                    ValidationSchema.bookTripSchema(), (err, value) => {
                        if (err)
                            return res.status(404).send({ message: 'Bad Requests', err })
                        return next()
                    })
            }
            return res.status(404).send({ message: 'date exception error' })
        }
        return res.status(404).send({ message: 'Bad Requests' })
    }
}

export default new TripMiddleWare;