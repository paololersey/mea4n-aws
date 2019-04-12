import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentModule } from '../shared/shared-component.module';

import { SearchVendingMachineModule } from './submodules/search-vending-machine.module';
import { GridVendingMachineModule } from './submodules/grid/grid-vending-machine.module';
import { VendingMachineRoutingModule } from './vending-machine.routing';
import { VendingMachineComponent } from './vending-machine.component';
import { MachineDialogModule } from './submodules/machine-dialog/machine-dialog.module';

@NgModule({
    imports: [SharedModule, SharedComponentModule, VendingMachineRoutingModule,
        MachineDialogModule, SearchVendingMachineModule, GridVendingMachineModule],
    declarations: [VendingMachineComponent],
    exports: [SearchVendingMachineModule, GridVendingMachineModule, MachineDialogModule, VendingMachineComponent]
})
export class VendingMachineModule { }