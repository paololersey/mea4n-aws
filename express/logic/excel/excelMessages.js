// Require library
var excel = require('excel4node');
var excelUtils = require('./utils/excelUtils');
var dayMonthYearsUtils = require('../utils/dayMonthYearsUtils');

var headerStyle
var boldStyle
var dateStyle
var dateStyleWithTime
var numStyle

exports.createExcelMessages = (reportSearch, messages, machineLength) => {
    var workbook = new excel.Workbook();
    getStyles(workbook)
    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Results');
    getExcelHeaderInputParameters(worksheet, reportSearch)
    addAdditionalFilters(worksheet, reportSearch)


    // columns message
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET).string('n°')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 1).string('Date')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 2).string('Error code')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 3).string('Sales')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 4).string('Gain from last sms')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 5).string('Week day')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 6).string('Hour')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 7).string('Day Of Month')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 8).string('Month')
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + 9).string('Year')

    worksheet.cell(ROW_FILTER_START_OFFSET, COLUMN_DATA_START_OFFSET).style(headerStyle)
    worksheet.cell(ROW_DATA_START_OFFSET - 2, COLUMN_DATA_START_OFFSET).style(headerStyle)

    var rowIndex = ROW_DATA_START_OFFSET
    for (let i = 1; i < 12; i++) {
        worksheet.cell(ROW_FILTER_START_OFFSET, i).style(headerStyle)
        worksheet.cell(ROW_DATA_START_OFFSET-2, i).style(headerStyle)
    }

    messages.map((message) => {

        let moneyFromLastSms = 0;
        if (message.moneyFromLastSms && message.moneyFromLastSms.value) moneyFromLastSms = message.moneyFromLastSms.value
        let money = 0;
        if (message.money && message.money.value) money = message.money.value
        let month = ""
        if (message.month) month = dayMonthYearsUtils.translateMonth(message.month);
        let weekDay = ""
        if (message.weekDay) weekDay = dayMonthYearsUtils.translateWeekDay(message.weekDay);


        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET).string('N-ICE' + message.machine)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 1).date(message.date).style(dateStyleWithTime)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 2).string(message.errorCode ? message.errorCode : "")
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 3).number(money)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 4).number(moneyFromLastSms)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 5).string(weekDay)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 6).number(message.hour ? message.hour : 0)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 7).number(message.dayOfMonth ? message.dayOfMonth : 0)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 8).string(month)
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET + 9).number(message.year ? message.year : 0)

        rowIndex++

    })

    return workbook;
}



// utility functions

function getStyles(workbook) {
    var arrayStyles = excelUtils.getStyles(workbook)
    headerStyle = arrayStyles[0]
    boldStyle = arrayStyles[1]
    dateStyle = arrayStyles[2],
        dateStyleWithTime = arrayStyles[2],
        numStyle = arrayStyles[3]
}

function addAdditionalFilters(worksheet, reportSearch) {

    let arraytranslatedWeekDays = []
    let arraytranslatedMonths = []
    if (reportSearch.weekDays) {
        arraytranslatedWeekDays = dayMonthYearsUtils.translateWeekDays(reportSearch.weekDays);
    }
    if (reportSearch.months) {
        arraytranslatedMonths = dayMonthYearsUtils.translateMonths(reportSearch.months);
    }

    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 4).string("Month Days").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 4).string(reportSearch.monthDays ? reportSearch.monthDays.toString() : "")

    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 5).string("Months").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 5).string(arraytranslatedMonths.toString())

    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 6).string("Years").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 6).string(reportSearch.years ? reportSearch.years.toString() : "")

    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 7).string("Week days").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 7).string(arraytranslatedWeekDays.toString())

    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 8).string("Hours").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 8).string(reportSearch.hours ? reportSearch.hours.toString() : "")

    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 9).string("Errors").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 9).string(reportSearch.errors ? reportSearch.errors.toString() : "")


}

function getExcelHeaderInputParameters(workbook, reportSearch) {
    var arrayParams = excelUtils.getExcelHeaderInputParameters(workbook, reportSearch)
    ROW_DATA_START_OFFSET = arrayParams[0]
    COLUMN_DATA_START_OFFSET = arrayParams[1]
    ROW_FILTER_START_OFFSET = arrayParams[2]
    COLUMN_FILTER_START_OFFSET = arrayParams[3]
}