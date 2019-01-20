import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { VendingMachineSearch} from './../model/vendingMachineSearch';
import { EmitService} from './../../../modules/common/service/emit.service';
import { MACHINE_NICE, ERRORS_NICE, YEARS, MONTHS, MONTHDAYS, WEEKDAYS, HOURS } from '../../common/service/constants.service';


@Component({
    selector: 'search-vending-machine',
    templateUrl: 'search-vending-machine.component.html',
    styleUrls: ['./search-vending-machine.component.css'],
})
export class SearchVendingMachineComponent implements OnInit{

    searchFlag: any;
    machineList: IMultiSelectOption[];
    statusList: IMultiSelectOption[];
    model: VendingMachineSearch;

    constructor(private emitService: EmitService) {
        //emitService.flagSearch.subscribe(item => console.log(item));    
    }

    ngOnInit(): void {
        this.getMachineInvoke();
        this.model = new VendingMachineSearch()
       //TODO
    }      
    

    find(): void {
      this.emitService.startSearch(true);
    }

    // machines
    getMachineInvoke(): void {
        this.getMachinesMock();
        //this.getMachines();
    }

    getMachinesMock(): void {
        this.machineList = MACHINE_NICE;
    }
}   