
class TripMiddleWare {
    constructor() {
        this.validateStartAndArrivalTerminalRequest = this.validateStartAndArrivalTerminalRequest.bind(this);
    }

    validateStartAndArrivalTerminalRequest(req, res, next) {
        const { startterminalid, arrivalterminalid } = req.body;
        if ((startterminalid !== null && typeof startterminalid === 'number') &&
            (arrivalterminalid !== null && typeof arrivalterminalid === 'number')) {
            return next()
        }
        return res.status(404).send({ message: 'Bad Requests' })
    }
}

export default new TripMiddleWare;