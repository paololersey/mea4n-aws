import { Component } from "@angular/core";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VendingMachineSearch } from './../../model/vendingMachineSearch';
import { EmitService } from './../../../../modules/common/service/emit.service';

@Component({
    selector: 'grid-vending-machine',
    templateUrl: 'grid-vending-machine.component.html',
    styleUrls: ['./grid-vending-machine.component.css'],
})
export class GridVendingMachineComponent implements OnInit {

    searchEnded: Boolean;
    model: VendingMachineSearch;

    constructor(private emitService: EmitService) {
        emitService.flagSearch.subscribe(item => {
            console.log(item); 
            this.searchEnded = true;
        })
    }

    ngOnInit(): void {
        this.model = new VendingMachineSearch()
    }

}   