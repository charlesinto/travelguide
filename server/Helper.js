import { LIMIT_DATE } from "./constants";
import Moment from "moment";

class Helper {
    static getPastDate() {
        const formattedPrevioustDate = Moment(Moment()).subtract(1, 'days')
            .format('YYYY-MM-DD');
        return formattedPrevioustDate;
    }
    static getLimitDate() {
        const formattedLimitDate = Moment(Moment()).add(LIMIT_DATE, 'days').format('YYYY-MM-DD');
        return formattedLimitDate
    }

    static getDatePart(date) {
        return date.split('-')
    }

    static isDateWithinRange(startDatePart, minDatePart, maxDatePart) {
        return (new Date(startDatePart[0], startDatePart[1], startDatePart[2]) >
            new Date(minDatePart[0], minDatePart[1], minDatePart[2])) &&
            (new Date(startDatePart[0], startDatePart[1], startDatePart[2]) <
                new Date(maxDatePart[0], maxDatePart[1], maxDatePart[2])
            )
    }
}

export default Helper;