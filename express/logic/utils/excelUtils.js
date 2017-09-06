// Require library
var excel = require('excel4node');


exports.configureExcel = () => {
    // Create a new instance of a Workbook class
    var workbook = new excel.Workbook();


    // Create a reusable style
    var style = workbook.createStyle({
        font: {
            color: '#FF0800',
            size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -',
        dateFormat: 'm/d/yy'
    });

    
    return workbook;
}

exports.writeNewColumnCondition = (lastExecutionDate, execDateDDMMYYYY) => { 
    return (lastExecutionDate==null || lastExecutionDate.toISOString().substring(0,10)!=execDateDDMMYYYY);
}