import conn from "../Database";
import Helper from "../Helper";
import TripModel from "../Model/TripModel";

class TripBookingController {
    constructor() {
        this.registerNewTrip = this.registerNewTrip.bind(this);
        this.processTripOnPaymentType = this.processTripOnPaymentType.bind(this);
    }
    registerNewTrip(req, res) {

        const { paymentType, seats, travellerDetails, tripSelected } = req.body
        this.processTripOnPaymentType(paymentType,
            travellerDetails, seats, tripSelected, res)
    }
    processTripOnPaymentType(paymentType, travellerDetails, seats, tripDetails, res) {
        const { id, carid, companyname, price_per_seat, companyid,
            startTerminal, arrivalTerminal, depature_date } = tripDetails;
        const numberOfSeats = seats.length;
        const selectedCarSeats = seats.join(',')
        switch (paymentType) {
            case 'Reserve Booking':
                const offline_reference_number = Helper.generateUniqueId(companyname)
                const totalAMountPaid = 0;
                console.log('here o', offline_reference_number)
                 this.registerTrip(startTerminal, arrivalTerminal, numberOfSeats,
                    depature_date, companyid, id, carid, price_per_seat, '',
                    offline_reference_number, totalAMountPaid, paymentType, selectedCarSeats,
                    seats, travellerDetails, res);
                break;
            case 'Pay Online':
                break;
            case 'Pay On Arrival':
                break;
            default:
                console.log('default')
                break
        }
    }

    registerTrip( startTerminal, arrivalTerminal, numberOfSeats, depature_date,
        companyid, routeid, carid, price_per_seat, paymentGateway= '',
        reference_number, totalAMountPaid, 
            paymentType, selectedCarSeats, seats, travellerDetails, res){
                conn.query(TripModel.bookTrip(), [
                    startTerminal, arrivalTerminal, numberOfSeats, depature_date,
                    companyid, routeid, carid, price_per_seat, paymentGateway,
                    reference_number, totalAMountPaid, paymentType, selectedCarSeats
                ], (err, results) => {
                    if (err)
                        return res.status(400).send({ message: 'error executing query', err });
                    const response = results[0]
                    const responseObject = response[0];
                    const { tripnumber, bookcarid, booknumber } = responseObject;
                    if (booknumber === -403 || booknumber === -402 || booknumber === -404) {
                        return res.status(400).send({
                            message: `error occurred, trip is no longer available 
                                            or selected seats has been booked`
                        });

                    } else {
                        const createPassengersQuery = TripModel.createPassengers(travellerDetails, booknumber);
                        const bookseatsQuery = TripModel.bookseats(seats, booknumber, tripnumber, depature_date);
                        return conn.query(createPassengersQuery, (err, results, fields) => {
                            if (err)
                                return res.status(400).send({ message: 'error creating new passenger', err })
                            conn.query(bookseatsQuery, (err, results, fields) => {
                                if (err)
                                    return res.status(400).send({ message: 'error deploying seats', err })
                                switch(paymentType){
                                    case 'Reserve Booking':
                                        return this.sendMail(reference_number, booknumber, travellerDetails, res)
                                    default:
                                        break;
                                }
                            })
                        })
                    }
                })
    }

    sendMail(reference_number, booknumber, travellerDetails, res){

        res.status(200).send({
            offline_reference_number: reference_number, 
             booknumber,
             message: '\
                seats reserved successfully, reservation expires after 2 hours\
                Use the offline reference number to complete payment'
         })
    }

}

export default new TripBookingController;