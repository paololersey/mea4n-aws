import { Component } from "@angular/core";

import { GridOptions } from "ag-grid/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Income } from './modules/control/model/income';
import { OnInit } from '@angular/core'

import { NavigatorComponent } from './modules/navigator/components/navigator.component'
import { GridComponent } from './modules/control/components/grid.component'
import { TotalIncomeView } from './modules/control/components/total-income-view.component'

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    

    ngOnInit(): void {
        
    };

    
}