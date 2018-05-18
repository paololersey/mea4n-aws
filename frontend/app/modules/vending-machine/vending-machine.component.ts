import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { VendingMachineSearch} from './model/vendingMachineSearch';

@Component({
    selector: 'vending-machine',
    templateUrl: 'vending-machine.component.html',
    styleUrls: ['./vending-machine.component.css'],
})
export class VendingMachineComponent implements OnInit{

    searchFlag: any;
    machineList: IMultiSelectOption[];
    model: VendingMachineSearch;

    ngOnInit(): void {
       
       //TODO
    }      
    

    search(): void {
      this.searchFlag = true;
    }

}   