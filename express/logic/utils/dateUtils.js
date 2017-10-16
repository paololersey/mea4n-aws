var moment = require('moment')

exports.prepareDates = () => {
    let arrayStartDates = new Array();

    arrayStartDates[0] = moment().startOf('day').add(1, 'hours');
    arrayStartDates[1] = moment().subtract(1, 'days').startOf('day').add(1, 'hours');
    arrayStartDates[2] = moment().startOf('isoweek').add(1, 'hours'); // or .startOf('week').isoWeekday(1);
    arrayStartDates[3] = moment().startOf('month').add(1, 'hours');

    let arrayEndDates = new Array();

    arrayEndDates[0] = moment().endOf('day').add(1, 'hours');
    arrayEndDates[1] = moment().subtract(1, 'days').endOf('day').add(1, 'hours');
    arrayEndDates[2] = moment().endOf('day').add(1, 'hours');
    arrayEndDates[3] = moment().endOf('day').add(1, 'hours');

    let dates = {
        "arrayStartDates": arrayStartDates,
        "arrayEndDates": arrayEndDates
    }

    return dates;

}
