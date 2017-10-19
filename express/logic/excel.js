// Require library
var excel = require('excel4node');
var excelUtils = require('../logic/utils/excelUtils');

var headerStyle
var boldStyle
var dateStyle
var numStyle

var ROW_FILTER_START_OFFSET
var ROW_DATA_START_OFFSET

var COLUMN_FILTER_START_OFFSET
var COLUMN_DATA_START_OFFSET

exports.createExcelIncome = (reportSearch, incomes, machineLength, timerangeLength) => {
    var workbook = new excel.Workbook();

    setStyle(workbook)
    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Results')

    
    var lastExecutionDate = null
    var areYouFilteringMachines = false
    if (reportSearch.machineIds && reportSearch.machineIds.length > 0) areYouFilteringMachines = true

    var ROW_DATA_SPAN = machineLength + 1
    // if machine filter applied, ROW_DATA_SPAN is lower than machineLength
    if (areYouFilteringMachines) ROW_DATA_SPAN = reportSearch.machineIds.length + 1

    var COLUMN_DATA_SPAN = timerangeLength + 1

    setExcelHeaderInputParameters(worksheet, reportSearch)
    var rowIndex = ROW_DATA_START_OFFSET
    var columnIndex = COLUMN_DATA_START_OFFSET

    incomes.map((income) => {

        worksheet.cell(ROW_FILTER_START_OFFSET, columnIndex).style(headerStyle)
        worksheet.cell(ROW_DATA_START_OFFSET - 2, columnIndex).style(headerStyle)

        var execDateDDMMYYYY = income.executionDate.toISOString().substring(0, 10);

        // here we change column after one column of incomes of the same day
        if (excelUtils.writeNewColumnCondition(lastExecutionDate, execDateDDMMYYYY)) {
            // write total per column 
            if (lastExecutionDate != null) {
                rowIndex = ROW_DATA_START_OFFSET;
            }
            columnIndex++;
            // write dates on a row
            worksheet.cell(ROW_DATA_START_OFFSET - 1, columnIndex).date(execDateDDMMYYYY).style(dateStyle);
        }
        if(areYouFilteringMachines) worksheet.cell(rowIndex + 1, COLUMN_DATA_START_OFFSET).string('N-ICE' + income.machineId)
        rowIndex++;

        //write total per day
        worksheet.cell(rowIndex, columnIndex).number(income.totalCurrentDay).style(numStyle)
        lastExecutionDate = income.executionDate
    })


    // write machine number
    if(!areYouFilteringMachines){
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

function setStyle(workbook) {
    // Create a reusable style
    headerStyle = workbook.createStyle({
        fill: {
            type: 'pattern',
            patternType: 'solid',
            fgColor: '#DFF0D8'
        }
        //numberFormat: '$#,##0.00; ($#,##0.00); -'
    });

    boldStyle = workbook.createStyle({
        font: {
            bold: true,
        }
    });

    dateStyle = workbook.createStyle({
        numberFormat: 'dd/mm/yyyy'
    })

    numStyle = workbook.createStyle({
        numberFormat: '0; -'
    });

}

function setExcelHeaderInputParameters(worksheet, reportSearch) {

    ROW_DATA_START_OFFSET = excelUtils.returnStartOffsetRowColumn()[0];
    COLUMN_DATA_START_OFFSET = excelUtils.returnStartOffsetRowColumn()[1];
    ROW_FILTER_START_OFFSET = excelUtils.returnStartOffsetRowColumn()[2];
    COLUMN_FILTER_START_OFFSET = excelUtils.returnStartOffsetRowColumn()[3];



    worksheet.cell(ROW_FILTER_START_OFFSET, COLUMN_DATA_START_OFFSET).string("Filters").style(headerStyle)
    /* Filter section */
    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET).string("Group by day").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 1).string("Date from").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 2).string("Date to").style(boldStyle)

    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET).string(reportSearch.groupByDay)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 1).date(reportSearch.dateFrom).style(dateStyle)

    // TO WATCH CAREFULLY !!!!!!!!
    // TO WATCH CAREFULLY !!!!!!!!
    // TO WATCH CAREFULLY !!!!!!!!
    /* -------------------------------------------------------------------------------------*/
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 2).date(reportSearch.dateTo /*.toISOString().substring(0, 10)*/ ).style(dateStyle)
    /* -------------------------------------------------------------------------------------*/

    /* Result section */
    worksheet.cell(ROW_DATA_START_OFFSET - 2, COLUMN_DATA_START_OFFSET).string("Results")
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET).string("n°")
}




exports.createExcelMessages = (reportSearch, messages, length) => {
    var workbook = new excel.Workbook();
    setStyle(workbook)
    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Results');
    setExcelHeaderInputParameters(worksheet, reportSearch)
    return workbook;
}