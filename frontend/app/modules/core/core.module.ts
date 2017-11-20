import {
    ModuleWithProviders, NgModule,
    Optional, SkipSelf
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { MachineService } from '../common/service/machine.service';
import { DialogModalService } from '../common/service/dialog-modal.service';
import { EmitService } from '../common/service/emit.service';
import { ErrorMapService } from '../common/service/error-map.service';

/* This module define all the providers for common services */
@NgModule({
    imports: [CommonModule],
    providers: [MachineService, ErrorMapService, DialogModalService, EmitService]
})
export class CoreModule {
}