// Require library
var excel = require('excel4node');

var headerStyle
var boldStyle
var dateStyle
var dateStyleWithTime
var numStyle

exports.writeNewColumnCondition = (lastExecutionDate, execDateDDMMYYYY) => {
    return (lastExecutionDate == null || lastExecutionDate.toISOString().substring(0, 10) != execDateDDMMYYYY);
}

exports.sumCells = (offset, size, letter) => {
    var formulaSum = "(";
    for (let i = offset; i < size; i++) {
        if (i < size - 1) formulaSum += letter + i + "+";
        if (i == size - 1) formulaSum += letter + i + ")";
    }
    return formulaSum;
}


exports.sumRowsPerSingleColumnFormula = (excel, rowStartOffset, rowIndex, columnIndex) => {
    return 'SUM(' + excel.getExcelCellRef(rowStartOffset + 1, columnIndex) + ':' + excel.getExcelCellRef(rowIndex, columnIndex) + ")"
}

exports.sumColumnsPerSingleRowFormula = (excel, columnStartOffset, rowIndex, columnIndex) => {
    return 'SUM(' + excel.getExcelCellRef(rowIndex, columnStartOffset + 1) + ':' + excel.getExcelCellRef(rowIndex, columnIndex) + ")"
}

exports.getStyles = (workbook) => {
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

    dateStyleWithTime = workbook.createStyle({
        numberFormat: 'dd/mm/yyyy HH:mm'
    })

    numStyle = workbook.createStyle({
        numberFormat: '0; -'
    });

    return [headerStyle, boldStyle, dateStyle, dateStyleWithTime, numStyle]


}

exports.getExcelHeaderInputParameters = (worksheet, reportSearch) =>{

    var ROW_DATA_START_OFFSET = returnStartOffsetRowColumn()[0];
    var COLUMN_DATA_START_OFFSET = returnStartOffsetRowColumn()[1];
    var ROW_FILTER_START_OFFSET = returnStartOffsetRowColumn()[2];
    var COLUMN_FILTER_START_OFFSET = returnStartOffsetRowColumn()[3];

    worksheet.cell(ROW_FILTER_START_OFFSET, COLUMN_DATA_START_OFFSET).string("Filters").style(headerStyle)
    /* Filter section */
    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET).string("Group by day").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 1).string("Date from").style(boldStyle)
    worksheet.cell(ROW_FILTER_START_OFFSET + 1, COLUMN_FILTER_START_OFFSET + 2).string("Date to").style(boldStyle)

    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET).string(reportSearch.groupByDay)
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 1).date(reportSearch.dateFrom).style(dateStyle)

    // TO WATCH CAREFULLY !!!!!!!!
    /* -------------------------------------------------------------------------------------*/
    worksheet.cell(ROW_FILTER_START_OFFSET + 2, COLUMN_FILTER_START_OFFSET + 2).date(reportSearch.dateTo /*.toISOString().substring(0, 10)*/ ).style(dateStyle)
    /* -------------------------------------------------------------------------------------*/

    /* Result section */
    worksheet.cell(ROW_DATA_START_OFFSET - 2, COLUMN_DATA_START_OFFSET).string("Results")
    worksheet.cell(ROW_DATA_START_OFFSET - 1, COLUMN_DATA_START_OFFSET).string("n°")

    return [ROW_DATA_START_OFFSET, COLUMN_DATA_START_OFFSET, ROW_FILTER_START_OFFSET, COLUMN_FILTER_START_OFFSET]
}

returnStartOffsetRowColumn = () => {
    let rowDataOffset = 6;
    let columnDataOffset = 1;
    let rowFilterOffset = 1;
    let columnFilterOffset = 2;
    let offsets = new Array();
    offsets.push(rowDataOffset);
    offsets.push(columnDataOffset);
    offsets.push(rowFilterOffset);
    offsets.push(columnFilterOffset);

    return offsets
}