import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentModule } from '../shared/shared-component.module';

import { SearchVendingMachineModule } from './submodules/search-vending-machine.module';
import { GridVendingMachineModule } from './submodules/grid/grid-vending-machine.module';
import { VendingMachineRoutingModule } from './vending-machine.routing';
import { VendingMachineComponent } from './vending-machine.component';

import { MultiSelectComponent } from '../common/components/multiselect/ss-multiselect-dropdown.component'

@NgModule({
    imports: [SharedModule, SharedComponentModule, VendingMachineRoutingModule ,SearchVendingMachineModule, GridVendingMachineModule],
    declarations: [ VendingMachineComponent ],
    exports: [ SearchVendingMachineModule, GridVendingMachineModule, VendingMachineComponent]
})
export class  VendingMachineModule { }