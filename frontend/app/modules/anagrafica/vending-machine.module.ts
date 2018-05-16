import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentModule } from '../shared/shared-component.module';

import { VendingMachineRoutingModule } from './vending-machine.routing';
import { VendingMachineComponent } from './vending-machine.component';

import { MultiSelectComponent } from '../common/components/multiselect/ss-multiselect-dropdown.component'

@NgModule({
    imports: [SharedModule, SharedComponentModule, VendingMachineRoutingModule],
    declarations: [ VendingMachineComponent ],
    exports: [ VendingMachineComponent]
})
export class  VendingMachineModule { }