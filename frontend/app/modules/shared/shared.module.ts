import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// ag-grid
import { AgGridModule } from "ag-grid-angular/main";
// applicatio
import { ResetBreakdownModalComponent } from "../../modules/onlineReading/components/reset-breakdown-modal.component";

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        AgGridModule.withComponents([ResetBreakdownModalComponent]
        ),
        NgbModule.forRoot(),
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule
    ],
    exports: [
        CommonModule, 
        AgGridModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule,
        NgbModule
    ]

})
export class SharedModule {
}
