// Require library
var excel = require('excel4node');
var excelUtils = require('../logic/utils/excelUtils');


exports.createExcel = (incomes) => {

    var workbook = new excel.Workbook();
    // Create a reusable style
    var style = workbook.createStyle({
        font: {
            color: '#FF0800',
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });

    var num = workbook.createStyle({
        numberFormat: '0.00'
    });


    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');

    var ROW_START_OFFSET = excelUtils.returnStartOffsetRowColumn()[0];
    var COLUMN_START_OFFSET = excelUtils.returnStartOffsetRowColumn()[1];

    var rowIndex = ROW_START_OFFSET
    var columnIndex = COLUMN_START_OFFSET
    var lastExecutionDate = null

    incomes.map((income) => {


        var execDateDDMMYYYY = income.executionDate.toISOString().substring(0, 10);

        if (excelUtils.writeNewColumnCondition(lastExecutionDate, execDateDDMMYYYY)) {
            // write total per column 
            if (lastExecutionDate != null) {
                // write TOTALS PER DAY, i.e. sum of the day income for all the machines
                worksheet.cell(rowIndex + 1, columnIndex).formula(excelUtils.sumRowsPerSingleColumnFormula(excel, ROW_START_OFFSET, rowIndex, columnIndex)).style(num);
                rowIndex = ROW_START_OFFSET;
            }
            columnIndex++;
            worksheet.cell(COLUMN_START_OFFSET, columnIndex).date(execDateDDMMYYYY).style({
                numberFormat: 'dd/mm/yyyy'
            });
        }
        rowIndex++;
        // write machine number
        worksheet.cell(rowIndex, COLUMN_START_OFFSET).string("N-ICE" + income.machineId)
        //write total per day
        worksheet.cell(rowIndex, columnIndex).number(income.totalCurrentDay).style(num)
        lastExecutionDate = income.executionDate
    })

    // write sum for the last column
    for (let i = 0; i < incomes.length; i++) {
        if (i === incomes.length - 1) {
            worksheet.cell(rowIndex + 1, columnIndex).formula(excelUtils.sumRowsPerSingleColumnFormula(excel, ROW_START_OFFSET, rowIndex, columnIndex)).style(num);
        }
    }

    // write TOTALS PER MACHINE, i.e. sum of the machines income in a period
    for (let i = 0; i < rowIndex; i++) {
        if (i == 0) continue;
        worksheet.cell(ROW_START_OFFSET + i, columnIndex + 1).formula(excelUtils.sumColumnsPerSingleRowFormula(excel, COLUMN_START_OFFSET, ROW_START_OFFSET + i, columnIndex)).style(num);

    }
    worksheet.cell(1, columnIndex + 1).string("TOTAL");
    worksheet.cell(rowIndex + 1, COLUMN_START_OFFSET).string("TOTAL");
  
    return workbook;
    // workbook.write('Excel.xlsx');

}