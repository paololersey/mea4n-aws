import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
// ag-grid
import { AgGridModule } from "ag-grid-angular/main";

import { TotalIncomeViewComponent } from './components/total-income-view.component';
import { GridComponent } from './components/grid.component';
import { ResetBreakdownModalComponent } from './components/reset-breakdown-modal.component';
import { MultiSelectComponent } from '../common/components/multiselect/ss-multiselect-dropdown.component'

import { IncomeService } from './service/incomes.service';


@NgModule({
    imports: [SharedModule, AgGridModule.withComponents([ResetBreakdownModalComponent]),],
    declarations: [TotalIncomeViewComponent, GridComponent,
        ResetBreakdownModalComponent],
    providers: [IncomeService],
    exports: [TotalIncomeViewComponent, GridComponent, ResetBreakdownModalComponent]
})
export class OnlineReadingModule { }