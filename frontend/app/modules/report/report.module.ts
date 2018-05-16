import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentModule } from '../shared/shared-component.module';

import { ReportComponent } from './components/report.component';
import { DialogModalComponent } from '../common/components/dialog/dialog-modal.component';

import { MultiSelectComponent } from '../common/components/multiselect/ss-multiselect-dropdown.component'
import { ReportService } from './service/report.service';
import { AngularBlobService } from './service/angular-blob.service';
import { DialogModalService } from '../common/service/dialog-modal.service'


@NgModule({
    imports: [SharedModule /*,SharedComponentModule*/],
    declarations: [ReportComponent,
        DialogModalComponent],
    providers: [ReportService, AngularBlobService, DialogModalService],
    exports: [ReportComponent]
})
export class ReportModule { }