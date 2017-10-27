// Require library
var excel = require('excel4node');
var excelUtils = require('./utils/excelUtils');

var headerStyle
var boldStyle
var dateStyle
var dateStyleWithTime
var numStyle

var ROW_FILTER_START_OFFSET
var ROW_DATA_START_OFFSET

var COLUMN_FILTER_START_OFFSET
var COLUMN_DATA_START_OFFSET

exports.createExcelIncome = (reportSearch, incomes, machineLength, timerangeLength) => {

    var workbook = new excel.Workbook();
    getStyles(workbook)
    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Results')


    var lastExecutionDate = null
    var areYouFilteringMachines = false
    if (reportSearch.machineIds && reportSearch.machineIds.length > 0) areYouFilteringMachines = true

    var COLUMN_DATA_SPAN = timerangeLength + 1
    var ROW_DATA_SPAN = machineLength + 1
    // if machine filter applied, ROW_DATA_SPAN is lower than machineLength
    if (areYouFilteringMachines) ROW_DATA_SPAN = reportSearch.machineIds.length + 1

    getExcelHeaderInputParameters(worksheet, reportSearch)
    var columnIndex = COLUMN_DATA_START_OFFSET

    incomes.map((income) => {

        worksheet.cell(ROW_FILTER_START_OFFSET, columnIndex).style(headerStyle)
        worksheet.cell(ROW_DATA_START_OFFSET - 2, columnIndex).style(headerStyle)

        var execDateDDMMYYYY = income.executionDate.toISOString().substring(0, 10);

        // here we change column after one column of incomes of the same day
        if (excelUtils.writeNewColumnCondition(lastExecutionDate, execDateDDMMYYYY)) {
            columnIndex++;
            // write dates on a row
            worksheet.cell(ROW_DATA_START_OFFSET - 1, columnIndex).date(execDateDDMMYYYY).style(dateStyle);
        }
        if (areYouFilteringMachines) {
            for (let i = 0; i < reportSearch.machineIds.length; i++) {
                let valueChosen = reportSearch.machineIds[i]
                if (valueChosen.toString() === income.machineId) {
                    worksheet.cell(ROW_DATA_START_OFFSET + i + 1, COLUMN_DATA_START_OFFSET).string('N-ICE' + income.machineId)
                    //write total per day
                    worksheet.cell(ROW_DATA_START_OFFSET + i + 1, columnIndex).number(income.totalCurrentDay).style(numStyle)
                    break;
                }
            }
        } else {
            worksheet.cell(ROW_DATA_START_OFFSET + parseFloat(income.machineId), COLUMN_DATA_START_OFFSET).string('N-ICE' + income.machineId)
            //write total per day
            worksheet.cell(ROW_DATA_START_OFFSET + parseFloat(income.machineId), columnIndex).number(income.totalCurrentDay).style(numStyle)
        }

        lastExecutionDate = income.executionDate
    })


    // write machine number
    if (!areYouFilteringMachines) {
        for (let i = 1; i <= machineLength; i++) {
            worksheet.cell(ROW_DATA_START_OFFSET + i, COLUMN_DATA_START_OFFSET).string('N-ICE' + i)
        }
    }

    // write TOTALS PER MACHINE, i.e. sum of the machines income in a period
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET + COLUMN_DATA_SPAN).string("TOTAL");
    for (let i = ROW_DATA_START_OFFSET + 1; i <= ROW_DATA_START_OFFSET + ROW_DATA_SPAN; i++) {
        if (i == ROW_DATA_START_OFFSET + ROW_DATA_SPAN + 1) break;
        worksheet.cell(i, COLUMN_DATA_START_OFFSET + COLUMN_DATA_SPAN).formula(excelUtils.sumColumnsPerSingleRowFormula(excel, COLUMN_DATA_START_OFFSET, i, COLUMN_DATA_START_OFFSET + COLUMN_DATA_SPAN - 1)).style(numStyle);
        worksheet.cell(i, COLUMN_DATA_START_OFFSET + COLUMN_DATA_SPAN).style(headerStyle)
    }

    // write TOTALS PER DAY, i.e. sum of the day income for every machine
    worksheet.cell(ROW_DATA_START_OFFSET + ROW_DATA_SPAN, COLUMN_DATA_START_OFFSET).string("TOTAL");
    for (let i = COLUMN_DATA_START_OFFSET + 1; i <= COLUMN_DATA_SPAN; i++) {
        worksheet.cell(ROW_DATA_START_OFFSET + ROW_DATA_SPAN, i).formula(excelUtils.sumRowsPerSingleColumnFormula(excel, ROW_DATA_START_OFFSET, ROW_DATA_START_OFFSET + ROW_DATA_SPAN - 1, i)).style(numStyle);
    }

    return workbook;
    // workbook.write('Excel.xlsx');
}

function getStyles(workbook) {
    var arrayStyles = excelUtils.getStyles(workbook)
    headerStyle = arrayStyles[0]
    boldStyle = arrayStyles[1]
    dateStyle = arrayStyles[2]
    dateStyleWithTime = arrayStyles[3]
    numStyle = arrayStyles[4]
}

function getExcelHeaderInputParameters(workbook, reportSearch) {
    var arrayParams = excelUtils.getExcelHeaderInputParameters(workbook, reportSearch)
    ROW_DATA_START_OFFSET = arrayParams[0]
    COLUMN_DATA_START_OFFSET = arrayParams[1]
    ROW_FILTER_START_OFFSET = arrayParams[2]
    COLUMN_FILTER_START_OFFSET = arrayParams[3]
}