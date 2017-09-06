import { Component } from "@angular/core";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnInit } from '@angular/core';
import { ReportSearch } from '../model/reportSearch';
import { AngularBlobService } from '../service/blob.export.service';
import { ReportService } from '../service/report.service';
import { CustomBrowserXhr } from '../service/custom.browser.xhr';
import { BrowserXhr } from '@angular/http';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import {NgbDatepickerConfig, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { MACHINE_NICE, YEARS, MONTHS} from '../service/constants.service';

@Component({
    selector: 'report',
    templateUrl: 'report.component.html',
    styleUrls: ['./report.component.css'],
    providers: [AngularBlobService, ReportService, NgbDatepickerConfig ]
})
export class ReportComponent implements OnInit {

    model: ReportSearch;
    showMessagesFilters : Boolean;
    errorMessage: any = {};
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    yearsOptions : IMultiSelectOption[];

    constructor(private reportService: ReportService, 
        private angularBlobService: AngularBlobService,
        config: NgbDatepickerConfig) {
        this.model = new ReportSearch();
        this.model.groupByDay = true
        config.minDate = {year: 2017, month: 1, day: 1};
        config.maxDate = {year: (new Date()).getFullYear(), month: (new Date()).getMonth()+1, day: (new Date()).getDate()};
    }

    onChange() {
        console.log(this.optionsModel);
    }

    triggerExcelReport(): void {
        this.model.dateFrom = this.reportService.transformDate(this.model.dateFrom);
        this.model.dateTo = this.reportService.transformDate(this.model.dateTo);
        this.angularBlobService.download(this.model);
    }

    ngOnInit(): void {
        this.myOptions = MACHINE_NICE
        this.yearsOptions = YEARS
    }

    groupByDayChange(groupByDay) : any {
         groupByDay = !groupByDay
         this.showMessagesFilters=!this.showMessagesFilters
    }

}