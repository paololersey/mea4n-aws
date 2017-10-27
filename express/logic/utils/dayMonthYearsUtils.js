var utils = require('./utils');

exports.translateWeekDays = (weekDays) => {
    let translatedArray = []
    utils.integerSort(weekDays).map(weekDay => {
        translatedArray.push(this.translateWeekDay(weekDay))
    })
    return translatedArray
}

exports.translateMonths = (months) => {
    let translatedArray = []
    utils.integerSort(months).map(month => {
        translatedArray.push(this.translateMonth(month))
    })
    return translatedArray
}


exports.translateWeekDay = (weekDay) => {
    switch (weekDay) {
        case 0:
            return 'Sunday'
        case 1:
            return 'Monday'
        case 2:
            return 'Tuesday'
        case 3:
            return 'Wednesday'
        case 4:
            return 'Thursday'
        case 5:
            return 'Friday'
        case 6:
            return 'Saturday'

    }
}

exports.translateMonth = (month) => {
    switch (month) {
        case 1:
            return 'January'
        case 2:
            return 'February'
        case 3:
            return 'March'
        case 4:
            return 'April'
        case 5:
            return 'May'
        case 6:
            return 'June'
        case 7:
            return 'July'
        case 8:
            return 'August'
        case 9:
            return 'September'
        case 10:
            return 'October'
        case 11:
            return 'November'
        case 12:
            return 'December'
    }
}