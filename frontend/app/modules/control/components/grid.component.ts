import { Component } from "@angular/core";

import { GridOptions } from "ag-grid/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Income } from '../model/income';
import { IncomeService } from '../service/incomes.service';
import { OnInit } from '@angular/core'
import { TotalIncomeView } from '../components/total-income-view.component'
import { ResetBreakdownModalComponent } from '../components/reset-breakdown-modal.component'

@Component({
    selector: 'ag-grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['./grid.component.css'],
    providers: [IncomeService]
})
export class GridComponent implements OnInit {
    private gridOptions: GridOptions;
    public rowData: Income[];
    private columnDefs: any[];
    private errorMessage: string;

    constructor(private incomeService: IncomeService) {

        /*eventUpdate(event: object) {
            this.counterValue = event.count;
        }*/

        setInterval(() => {
            this.getIncomesMock();
            //this.getIncomes();
        }, 10000);

        // we pass an empty gridOptions in, so we can grab the api out
        this.gridOptions = <GridOptions>{
            onGridReady: () => {
                this.gridOptions.api.refreshView();
                this.gridOptions.api.sizeColumnsToFit();
                this.gridOptions.enableColResize = true;
                //var mq = window.matchMedia("(min-width: 500px)");
                this.gridOptions.api.setHeaderHeight(40);


            },
            getRowStyle: (params) => {
                if (params.data.status === 'WA') {
                    return { 'background-color': '#f9f9a2' }
                }
                else if (params.data.status === 'ER') {
                    return { 'background-color': '#fc8080' }
                }
                else if (params.data.status === 'DA') {
                    return { 'background-color': '#f2b715' }
                }
                else {
                    return { 'background-color': 'white' }
                }
            },

            getRowHeight: () => {
                return 40
            },




        };

        this.columnDefs = [

            { headerName: "N-ICE", field: "machineId"/*, headerComponentFramework: MyHeaderComponent */ },
            { headerName: "Day total", field: "totalCurrentDay" },
            { headerName: "Yesterday total", field: "totalYesterDay" },
            { headerName: "Week total", field: "totalCurrentWeek" },
            { headerName: "Month total", field: "totalCurrentMonth" },
            { headerName: "Last error", field: "lastError" },
            { headerName: "Reset", field: "value", cellRendererFramework: ResetBreakdownModalComponent }

        ];

    }


    ngOnInit(): void {
       //this.getIncomesMock();
            this.getIncomes();
    };

    getIncomes(): void {
         this.incomeService.getIncomes()
            .subscribe(
            result => this.rowData = result,
            error => this.errorMessage = <any>error)
    }

    getIncomesMock(): void {
        this.incomeService.getIncomesMock().then((result) => {
            this.rowData = result;
        });
    }
}

/*function MyHeaderComponent() {
}

MyHeaderComponent.prototype.init = function (agParams){
    this.agParams = agParams;
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = ''+
        '<div style="background-color: black"></div>'
     
};

MyHeaderComponent.prototype.getGui = function (){
    return this.eGui;
};
*/
