import { Component, OnInit, OnChanges, SimpleChanges, Input } from "@angular/core";
import { VendingMachineSearch } from './../../model/vendingMachineSearch';
import { EmitService } from './../../../../modules/common/service/emit.service';
import { GridOptions } from "ag-grid/main";
import { Machine } from "../../../common/model/machine";
import { MachineDialogComponent } from "../machine-dialog/machine-dialog.component";
import { MachineService } from "../../../common/service/machine.service";

@Component({
    selector: 'grid-vending-machine',
    templateUrl: 'grid-vending-machine.component.html',
    styleUrls: ['./grid-vending-machine.component.css'],
})
export class GridVendingMachineComponent implements OnInit, OnChanges {

    searchEnded: Boolean;
    model: VendingMachineSearch;

    private gridOptions: GridOptions;
    public rowData: Machine[];
    errorMessage: any = {}
    private columnDefs: any[];
    @Input()
    machinesList: Machine[];

    constructor(private emitService: EmitService,
        private machineService: MachineService) {


        /* emitService.flagSearch.subscribe(item => {
             console.log(item);
             this.searchEnded = true;
             
         })*/

        this.gridOptions = <GridOptions>{
            onGridReady: () => {
                this.gridOptions.api.refreshView();
                this.gridOptions.api.sizeColumnsToFit();
                this.gridOptions.enableColResize = true;
                this.gridOptions.api.setHeaderHeight(40);
            },

            getRowHeight: () => {
                return 40
            },

        };

        this.columnDefs = [

            { headerName: "N-ICE", field: "machineId", width: 130,/*, suppressSizeToFit:true, headerComponentFramework: MyHeaderComponent */ },
            { headerName: "Status", field: "status", width: 150 },
            { headerName: "Number", field: "machineCurrentNumber", width: 240 },
            { headerName: "Edit", width: 110, cellRendererFramework: MachineDialogComponent }

        ];

    }
    ngOnInit(): void {
        this.model = new VendingMachineSearch()
       /* this.rowData = [{
            'machineId': '1', 'status': 'I',
            'machineCurrentNumber': '3431919192', startDate: null, endDate: null
        }]*/
    }

    ngOnChanges(event: SimpleChanges) {
       if (event.machinesList && event.machinesList.currentValue) {
            console.log(event.machinesList)
            this.rowData = event.machinesList.currentValue;
        }
    }



}   