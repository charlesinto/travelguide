
class TripModel {
    getAvailableTrips() {
        return `
        call get_Routes(?, ?);
        `
    }
}

export default new TripModel;
