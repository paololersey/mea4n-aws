// Require library
var excel = require('excel4node');


exports.writeNewColumnCondition = (lastExecutionDate, execDateDDMMYYYY) => {
    return (lastExecutionDate == null || lastExecutionDate.toISOString().substring(0, 10) != execDateDDMMYYYY);
}

exports.returnStartOffsetRowColumn = () => {
    let rowDataOffset = 6;
    let columnDataOffset = 1;
    let rowFilterOffset = 1;
    let columnFilterOffset = 2;
    let offsets=new Array();
    offsets.push(rowDataOffset);
    offsets.push(columnDataOffset);
    offsets.push(rowFilterOffset);
    offsets.push(columnFilterOffset);

    return offsets
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
    return 'SUM(' + excel.getExcelCellRef(rowStartOffset +1, columnIndex) + ':' + excel.getExcelCellRef(rowIndex, columnIndex) + ")"
}

exports.sumColumnsPerSingleRowFormula = (excel, columnStartOffset, rowIndex, columnIndex) => {
    return 'SUM(' + excel.getExcelCellRef(rowIndex, columnStartOffset+1) + ':' + excel.getExcelCellRef(rowIndex, columnIndex) + ")"
}