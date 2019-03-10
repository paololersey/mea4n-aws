import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
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
export class GridVendingMachineComponent implements OnInit {

    searchEnded: Boolean;
    model: VendingMachineSearch;

    private gridOptions: GridOptions;
    public rowData: Machine[];
    errorMessage: any = {}
    private columnDefs: any[];

    constructor(private emitService: EmitService,
        private machineService: MachineService) {

            
        emitService.flagSearch.subscribe(item => {
            console.log(item);
            this.searchEnded = true;
            this.machineService.getAllMachines()
                .subscribe(
                    machines => {
                        console.log(machines);
                        this.rowData = machines;
                    },
                    error => this.errorMessage = <any>error
                )
        })

        this.gridOptions = <GridOptions>{
            onGridReady: () => {
                // this.gridOptions.api.refreshView();
                //this.gridOptions.api.sizeColumnsToFit();
                this.gridOptions.enableColResize = true;
                //var mq = window.matchMedia("(min-width: 500px)");
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
        this.rowData = [{
            'machineId': '1', 'status': 'I',
            'machineCurrentNumber': '3431919192', startDate: null, endDate: null
        }]
    }



}   