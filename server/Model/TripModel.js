import { stat } from "fs";

class TripModel {
    getAvailableTrips() {
        return `
        call get_Routes(?, ?, ?);
        `
    }

    bookTrip() {
        return `
            call trips_create_register(?,?,?,?,?,?,?,?,?,?,?,?,?);
        `
    }
    createPassengers(travellers, booknumber) {
        let values = ''
        let statement = 'insert into booked_trips_passenger_details(firstname, lastname,emailaddress, phonenumber, booknumber) values'
        travellers.forEach(passenger => {
            values += `('${passenger.firstname}', '${passenger.lastname}', '${passenger.emailaddress}','${passenger.phonenumber}', '${booknumber}'),`
        })
        //remove the last comma
        let newValues = values.substring(0, values.length - 1);
        newValues += ';'
        statement += newValues;
        return statement;
    }
    bookseats(seats, booknumber, tripnumber, datebooked) {
        let statement = 'insert into booked_car_seats(seatnumber, booknumber, tripnumber, datebooked) values'
        let values = ``;
        seats.forEach(seat => {
            values += `(${seat}, '${booknumber}', ${tripnumber}, '${datebooked}'),`

        });
        let newValues = values.substring(0, values.length - 1);
        newValues += ';'
        statement += newValues;
        return statement;
    }
    combineQueries(arrayofQueries) {
        let statement = ``;
        arrayofQueries.forEach(query => {
            statement += query;
        })
        statement += ';'
        return statement;
    }
}

export default new TripModel;
