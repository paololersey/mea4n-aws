import { Component, Input } from "@angular/core";

import { GridOptions } from "ag-grid/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Income } from '../model/income';
import { IncomeService } from '../service/incomes.service';
import { OnInit, OnChanges } from '@angular/core'
import { TotalIncomeViewComponent } from '../components/total-income-view.component'
import { ResetBreakdownModalComponent } from '../components/reset-breakdown-modal.component'

@Component({
    selector: 'ag-grid',
    templateUrl: 'grid.component.html',
    styleUrls: ['./grid.component.css'],
    inputs: ['statusChange']
})
export class GridComponent implements OnInit, OnChanges {
    private gridOptions: GridOptions;
    public rowData: Income[];
    private columnDefs: any[];
    private errorMessage: string;

    @Input()
    statusChange: string;



    constructor(private incomeService: IncomeService) {


        /*eventUpdate(event: object) {
            this.counterValue = event.count;
        }*/


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
                // WARNING
                if (params.data.status === 'WA') {
                    return { 'background-color': '#f9f9a2' }
                }
                // ERROR
                else if (params.data.status === 'ER') {
                    return { 'background-color': '#fc8080' }
                }
                // DANGER
                else if (params.data.status === 'DA') {
                    return { 'background-color': '#f2b715' }
                }
                // TIMEOUT
                else if (params.data.status === 'TI') {
                    return { 'background-color': '#DDCBD7' }
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

            { headerName: "N-ICE", field: "machineId", width: 110,/*, suppressSizeToFit:true, headerComponentFramework: MyHeaderComponent */ },
            { headerName: "Day total (&euro;)", field: "totalCurrentDay" },
            { headerName: "Yesterday total (&euro;)", field: "totalYesterDay" },
            { headerName: "Week total (&euro;)", field: "totalCurrentWeek" },
            { headerName: "Month total (&euro;)", field: "totalCurrentMonth" },
            { headerName: "Last error", field: "lastError", width: 380 },
            { headerName: "Reset", field: "value", cellRendererFramework: ResetBreakdownModalComponent }

        ];

    }


    ngOnInit(): void {
        this.getIncomesInvoke();
    };

    ngOnChanges(event): void {
        if (event['statusChange']) {
            //console.log('aio!')
        }
    }

    getIncomesInvoke(): void {
        // this.getIncomesMock();
        this.getIncomes();
    }

    getIncomes(): void {
        this.incomeService.getIncomes()
            .subscribe(
                result => {
                    this.rowData = result.filter(element =>
                        element.connectionStatus !== 'INACTIVE')
                },
                error => this.errorMessage = <any>error)
    }

    getIncomesMock(): void {
        this.incomeService.getIncomesMock().then((result) => {
            this.rowData = result;
        });
    }

    updateStatus(): any {
        console.log("ciao!!")
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
