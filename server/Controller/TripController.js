import conn from "../Database";
import async from "async";
import TripModel from "../Model/TripModel";

class TripController {
    constructor() {
        this.getStartAndEndTerminals = this.getStartAndEndTerminals.bind(this);
        this.getCompanyForTrip = this.getCompanyForTrip.bind(this);
        this.bookTrip = this.bookTrip.bind(this);
    }
    async getStartAndEndTerminals(req, res) {
        try {
            const terminals = await this.getStartTerminal(req, res);
            res.status(200).send({
                message: `successful`,
                terminals
            })
        } catch (err) {
            res.status(400).send({ message: 'error executing query', err })
        }
        finally {
        }

    }
    async getCompanyForTrip(req, res) {
        const { startterminalid, arrivalterminalid, depature_date } = req.body;
        conn.query(TripModel.getAvailableTrips(),
            [startterminalid, arrivalterminalid, depature_date],
            (err, results, fields) => {
                if (err)
                    return res.status(400).send({ message: 'error executing', error: err.sqlMessage });
                return res.status(200).send({ trips: results[0], bookedSeats: results[1] })
            })
    }
    async getStartTerminal(req, res) {
        return new Promise((resolve, reject) => {
            conn.query(`select * from geo_terminals where isActive= ${1}`, (err, results, field) => {
                if (err)
                    return res.status(400).send({ message: 'error executing query', err })
                return resolve(results);

            });
        })

    }

    async getArrivalTerminals() {
        return new Promise((resolve, reject) => {
            conn.query(`select * from arrivalterminals where isActive= ${1}`, (err, results, field) => {
                if (err)
                    return res.status(400).send({ message: 'error executing query', err })
                return resolve(results);
            });
        })
    }

    async bookTrip(req, res) {
        const {
            startterminal, arrivalterminal, number_of_seats, start_date,
            companyid, routeid, carid, basefare, payment_gateway,
            payment_reference_number, total_amount_paid, payment_type,
            travellers, seats
        } = req.body;
        conn.query(TripModel.bookTrip(), [startterminal, arrivalterminal, number_of_seats, start_date,
            companyid, routeid, carid, basefare, payment_gateway,
            payment_reference_number, total_amount_paid, payment_type, seats.join(',')], (err, results) => {
                if (err)
                    return res.status(400).send({ message: 'error executing query', err })
                const response = results[0]
                const responseObject = response[0];
                const { tripnumber, bookcarid, booknumber } = responseObject;
                if (booknumber === -403 || booknumber === -402 || booknumber === -404) {
                    return res.status(400).send({
                        message: `error occurred, trip is no longer available 
                                    or selected seats has been booked`
                    });

                } else {
                    const createPassengersQuery = TripModel.createPassengers(travellers, booknumber);
                    const bookseatsQuery = TripModel.bookseats(seats, booknumber, tripnumber, start_date);
                    return conn.query(createPassengersQuery, (err, results, fields) => {
                        if (err)
                            return res.status(400).send({ message: 'error creating new passenger', err })
                        conn.query(bookseatsQuery, (err, results, fields) => {
                            if (err)
                                return res.status(400).send({ message: 'error deploying seats', err })
                            return res.status(200).send({
                                booknumber,
                                message: 'trip booked successfully'
                            })
                        })
                    })
                }

            })
    }
}

export default new TripController;