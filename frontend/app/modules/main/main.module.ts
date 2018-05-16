import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { SharedComponentModule } from './../shared/shared-component.module';
import { MainRoutingModule } from './main.routing';
import { OnlineReadingModule } from './../onlineReading/online-reading.module';
import { ReportModule } from './../report/report.module'
import { VendingMachineModule } from './../anagrafica/vending-machine.module';;
import { MainComponent } from './main.component';
import { MultiSelectComponent } from '../common/components/multiselect/ss-multiselect-dropdown.component'

@NgModule({
    imports: [SharedModule, SharedComponentModule,MainRoutingModule, OnlineReadingModule, ReportModule, VendingMachineModule],
    declarations: [
        MainComponent
    ],
    exports : [MainComponent]
})
export class MainModule { }
