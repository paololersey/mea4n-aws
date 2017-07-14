var moment = require('moment')

exports.prepareDates = () => {
    let arrayStartDates = new Array();

    arrayStartDates[0] = moment().startOf('day');
    arrayStartDates[1] = moment().subtract(1, 'days').startOf('day');
    arrayStartDates[2] = moment().startOf('isoweek'); // or .startOf('week').isoWeekday(1);
    arrayStartDates[3] = moment().startOf('month');

    let arrayEndDates = new Array();

    arrayEndDates[0] = moment().endOf('day');
    arrayEndDates[1] = moment().subtract(1, 'days').endOf('day');
    arrayEndDates[2] = moment().endOf('day');
    arrayEndDates[3] = moment().endOf('day');

    let dates = {
        "arrayStartDates": arrayStartDates,
        "arrayEndDates": arrayEndDates
    }

    return dates;

}