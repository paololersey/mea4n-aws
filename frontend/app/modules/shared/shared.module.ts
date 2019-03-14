import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// application

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';

import { MultiSelectComponent } from '../common/components/multiselect/ss-multiselect-dropdown.component'
import { DialogModalComponent } from '../common/components/dialog/dialog-modal.component';
import { DialogModalModule } from "../common/components/dialog/dialog-modal.module";



@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule,
        DialogModalModule
    ],
    declarations :[MultiSelectComponent],
    exports: [
        CommonModule, 
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule,
        NgbModule,
        DialogModalModule,
        //common components
        MultiSelectComponent
    ]

})
export class SharedModule {
}
