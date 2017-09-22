import { Component, Input, EventEmitter } from "@angular/core";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { ReportSearch } from '../model/reportSearch';
import { AngularBlobService } from '../service/blob.export.service';
import { ReportService } from '../service/report.service';
import { CustomBrowserXhr } from '../service/custom.browser.xhr';
import { BrowserXhr } from '@angular/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { NgbDatepickerConfig, NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MACHINE_NICE, YEARS, MONTHS } from '../service/constants.service';
import { DatepickerPopupComponent } from '../../common/datepicker-popup.component';
import { MachineService } from '../../common/service/machine.service';
import { Machine } from '../../common/model/machine';
import { NgbDateITParserFormatter } from "../../common/ngb-date-it-parser-formatter"

@Component({
    selector: 'report',
    templateUrl: 'report.component.html',
    styleUrls: ['./report.component.css'],
    providers: [AngularBlobService, ReportService, MachineService, NgbDatepickerConfig,
        {provide: NgbDateParserFormatter, useClass: NgbDateITParserFormatter}]
})
export class ReportComponent implements OnInit {

    model: ReportSearch;
    modelSentToServer: ReportSearch;
    machineList: IMultiSelectOption[];
    showMessagesFilters: Boolean;
    errorMessage: any = {};
    optionsModel: number[];
    myOptions: IMultiSelectOption[];

    yearsOptions: IMultiSelectOption[];

    constructor(private reportService: ReportService,
        private angularBlobService: AngularBlobService,
        private machineService: MachineService,
        config: NgbDatepickerConfig,
        ngbDateParserFormatter: NgbDateParserFormatter) {
        this.model = new ReportSearch();
        this.model.groupByDay = true
        config.minDate = { year: 2017, month: 1, day: 1 };
        config.maxDate = { year: (new Date()).getFullYear(), month: (new Date()).getMonth() + 1, day: (new Date()).getDate() };
    }

    onChange() {
        console.log(this.optionsModel);
    }


    triggerExcelReport(): void {

        this.modelSentToServer = JSON.parse(JSON.stringify(this.model))
        this.modelSentToServer.dateFrom = this.reportService.transformDate(this.model.dateFrom);
        this.modelSentToServer.dateTo = this.reportService.transformDate(this.model.dateTo);
        if (this.modelSentToServer.dateFrom.valueOf() > this.modelSentToServer.dateTo.valueOf()) {
            alert('"Date from" is after "Date to": please check!')
        }
        this.angularBlobService.download(this.modelSentToServer);

    }

    ngOnInit(): void {
        this.getMachineInvoke();
        this.yearsOptions = YEARS
    }

    groupByDayChange(groupByDay): any {
        groupByDay = !groupByDay
        this.showMessagesFilters = !this.showMessagesFilters
    }

    getMachineInvoke(): void {
        //this.getMachinesMock();
        this.getMachines();
    }

    getMachinesMock(): void {
        this.myOptions = MACHINE_NICE
    }

    getMachines(): void {
        this.machineService.getMachines()
            .subscribe(
            machineList => this.myOptions = machineList,
            error => this.errorMessage = <any>error)

    }

}