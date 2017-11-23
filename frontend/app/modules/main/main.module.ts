import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { OnlineReadingModule } from './../onlineReading/online-reading.module';
import { ReportModule } from './../report/report.module';
import { MainComponent } from './main.component';

@NgModule({
    imports: [SharedModule, OnlineReadingModule, ReportModule],
    declarations: [
        MainComponent
    ],
    exports : [MainComponent]
})
export class MainModule { }
