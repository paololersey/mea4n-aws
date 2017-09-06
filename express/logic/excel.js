// Require library
var excel = require('excel4node');
var excelUtils = require('../logic/utils/excelUtils');

exports.createExcel = (workbook, incomes) => {

    // Add Worksheets to the workbook
    var worksheet = workbook.addWorksheet('Sheet 1');

    var columnDateCount = 1;
    var lastExecutionDate = null;
    var lastMachineId = null;
    incomes.map((income) => {
        // write machine number
        let machineId=1 + Number(income.machineId)
        worksheet.cell(machineId, 1).string("N-ICE"+income.machineId);
        var execDateDDMMYYYY = income.executionDate.toISOString().substring(0, 10);
        
        if (excelUtils.writeNewColumnCondition(lastExecutionDate, execDateDDMMYYYY)) {           
            columnDateCount++;
            worksheet.cell(1, columnDateCount).date(execDateDDMMYYYY);
        }
        worksheet.cell(machineId, columnDateCount).number(income.totalCurrentDay);
        
        // per avere TOTAL: for per ogni macchina, fissato columnDateCount+1 
 
        
        lastExecutionDate = income.executionDate
        lastMachineId = machineId
    })
    worksheet.cell(1, columnDateCount+1).string("TOTAL");
     // Write total
     worksheet.cell(lastMachineId, columnDateCount+1).formula("SOMMA(B"+lastMachineId+":C"+lastMachineId+")")
    
    // Set value of cell A1 to 100 as a number type styled with paramaters of style
    //worksheet.cell(1, 1).number(100).style(style);

    // Set value of cell B1 to 300 as a number type styled with paramaters of style
    //worksheet.cell(1, 2).number(200).style(style);

    // Set value of cell C1 to a formula styled with paramaters of style
    //worksheet.cell(1, 3).formula('A1 + B1').style(style);

    // Set value of cell A2 to 'string' styled with paramaters of style
    //worksheet.cell(2, 1).string('string').style(style);

    // Set value of cell A3 to true as a boolean type styled with paramaters of style but with an adjustment to the font size.
    /*  worksheet.cell(1, 5).bool(true).style(style).style({
          font: {
              size: 14
          }
      });*/
    return workbook;
   // workbook.write('Excel.xlsx');

}