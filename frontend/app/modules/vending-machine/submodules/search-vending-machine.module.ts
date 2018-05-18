import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { SearchVendingMachineComponent } from './search-vending-machine.component';

import { MultiSelectComponent } from '../../common/components/multiselect/ss-multiselect-dropdown.component'

@NgModule({
    imports: [SharedModule],
    declarations: [ SearchVendingMachineComponent ],
    exports: [ SearchVendingMachineComponent]
})
export class  SearchVendingMachineModule { }