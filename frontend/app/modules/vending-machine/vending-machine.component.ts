import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { VendingMachineSearch } from './model/vendingMachineSearch';
import { MachineDialogComponent } from "./submodules/machine-dialog/machine-dialog.component";
import { EmitService } from "../common/service/emit.service";
import { MachineService } from "../common/service/machine.service";
import { Machine } from "../common/model/machine";

@Component({
    selector: 'vending-machine',
    templateUrl: 'vending-machine.component.html',
    styleUrls: ['./vending-machine.component.css'],
})
export class VendingMachineComponent implements OnInit {

    searchFlag: any;
    machineList: IMultiSelectOption[];
    model: VendingMachineSearch;
    machinesFound: Machine[];
    errorMessage: any = {}

    constructor(private emitService: EmitService,
        private machineService: MachineService) {


    }

    ngOnInit(): void {
        this.getAllMahines();
    }

    refresh(): void {
        this.getAllMahines();
    }

    getAllMahines() {
        this.machineService.getAllMachines()
            .subscribe(
                machines => {
                    console.log(machines);
                    this.machinesFound = machines;
                },
                error => this.errorMessage = <any>error
            )
    }



}   