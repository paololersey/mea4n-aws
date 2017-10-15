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

exports.createExcelIncome = (reportSearch, incomes, rowMax) => {
    var workbook = new excel.Workbook();
    
    setStyle(workbook)
    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Results')

    var ROW_DATA_MAX = rowMax    
    var rowIndex = ROW_DATA_START_OFFSET
    var columnIndex = COLUMN_DATA_START_OFFSET
    var lastExecutionDate = null
    
    setExcelHeaderInputParameters(worksheet, reportSearch)

    incomes.map((income) => {

        worksheet.cell(ROW_FILTER_START_OFFSET, columnIndex).style(headerStyle)
        worksheet.cell(ROW_DATA_START_OFFSET - 2, columnIndex).style(headerStyle)

        var execDateDDMMYYYY = income.executionDate.toISOString().substring(0, 10);

        if (excelUtils.writeNewColumnCondition(lastExecutionDate, execDateDDMMYYYY)) {
            // write total per column 
            if (lastExecutionDate != null) {
                // write TOTALS PER DAY, i.e. sum of the day income for all the machines
                worksheet.cell(rowIndex + 1, columnIndex).formula(excelUtils.sumRowsPerSingleColumnFormula(excel, ROW_DATA_START_OFFSET, rowIndex, columnIndex)).style(numStyle);
                rowIndex = ROW_DATA_START_OFFSET;
            }
            columnIndex++;
            // write dates on a row
            worksheet.cell(ROW_DATA_START_OFFSET - 1, columnIndex).date(execDateDDMMYYYY).style(dateStyle);
        }
        rowIndex++;
        // write machine number
        worksheet.cell(rowIndex, COLUMN_DATA_START_OFFSET).string('N-ICE' + income.machineId)
        //write total per day
        worksheet.cell(rowIndex, columnIndex).number(income.totalCurrentDay).style(numStyle)
        lastExecutionDate = income.executionDate
    })

    // write sum for the last column
    for (let i = 0; i < incomes.length; i++) {
        if (i === incomes.length - 1) {
            worksheet.cell(rowIndex + 1, columnIndex).formula(excelUtils.sumRowsPerSingleColumnFormula(excel, ROW_DATA_START_OFFSET, rowIndex, columnIndex)).style(numStyle);
        }
    }

    // write TOTALS PER MACHINE, i.e. sum of the machines income in a period
    for (let i = ROW_DATA_START_OFFSET + 1; i <= rowIndex + 1; i++) {
        if (i == ROW_DATA_START_OFFSET + ROW_DATA_MAX + 2) break;
        worksheet.cell(i, columnIndex + 1).formula(excelUtils.sumColumnsPerSingleRowFormula(excel, COLUMN_DATA_START_OFFSET, i, columnIndex)).style(numStyle);
        worksheet.cell(i, columnIndex + 1).style(headerStyle)
    }
    worksheet.cell(ROW_DATA_START_OFFSET - 1, columnIndex + 1).string("TOTAL");
    worksheet.cell(rowIndex + 1, COLUMN_DATA_START_OFFSET).string("TOTAL");

    return workbook;


    // workbook.write('Excel.xlsx');

}
function setStyle (workbook){
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
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 2).date(reportSearch.dateTo/*.toISOString().substring(0, 10)*/).style(dateStyle)
/* -------------------------------------------------------------------------------------*/

    /* Result section */
    worksheet.cell(ROW_DATA_START_OFFSET - 2, COLUMN_DATA_START_OFFSET).string("Results")
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET).string("n°")
}




exports.createExcelMessages = (reportSearch, messages, length)=>{
    var workbook = new excel.Workbook();
    setStyle(workbook)
    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Results');
    var ROW_DATA_MAX = length
    setExcelHeaderInputParameters(worksheet, reportSearch)
    return workbook;
}