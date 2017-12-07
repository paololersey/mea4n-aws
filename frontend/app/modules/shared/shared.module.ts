import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// applicatio

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule
    ],
    exports: [
        CommonModule, 
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule,
        NgbModule
    ]

})
export class SharedModule {
}
