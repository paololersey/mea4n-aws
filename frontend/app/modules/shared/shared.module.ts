import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
// application

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';

import { MultiSelectComponent } from '../common/components/multiselect/ss-multiselect-dropdown.component'



@NgModule({
    imports: [
        CommonModule,
        NgbModule.forRoot(),
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule
    ],
    declarations :[MultiSelectComponent],
    exports: [
        CommonModule, 
        HttpModule,
        JsonpModule,
        FormsModule,
        MultiselectDropdownModule,
        NgbModule,
        //common components
        MultiSelectComponent
    ]

})
export class SharedModule {
}
