import conn from "../Database";
import async from "async";
import TripModel from "../Model/TripModel";

class TripController {
    constructor() {
        this.getStartAndEndTerminals = this.getStartAndEndTerminals.bind(this);
        this.getCompanyForTrip = this.getCompanyForTrip.bind(this);
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
        const { startterminalid, arrivalterminalid } = req.body;
        conn.query(TripModel.getAvailableTrips(),
            [startterminalid, arrivalterminalid],
            (err, results, fields) => {
                if (err)
                    return res.status(400).send({ message: 'error executing' });
                return res.status(200).send({ trips: results[0] })
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
}

export default new TripController;