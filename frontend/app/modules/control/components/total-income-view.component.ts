import { Component } from "@angular/core";

import { GridOptions } from "ag-grid/main";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TotalIncome } from '../model/total-income';
import { IncomeService } from '../service/incomes.service';
import { OnInit } from '@angular/core'
import { Input } from '@angular/core'

@Component({
    selector: 'total-income-view',
    templateUrl: 'total-income-view.component.html',
    styleUrls: ['./total-income-view.component.css'],
    providers: [IncomeService]
})
export class TotalIncomeView implements OnInit {

    private errorMessage: string;;
    public totals: Array<Number> = [];

    @Input()
    public panels: Array<IPanel> = [];

    constructor(private incomeService: IncomeService) { };

    ngOnInit(): void {
        //this.getTotalCurrentIncomes();
        this.getTotalCurrentIncomesMock();
    }

    getTotalCurrentIncomes(): void {
        this.incomeService.getTotalCurrentIncomes()
            .subscribe(
            result => {
                this.totals.push(result.totalDay);
                this.totals.push(result.totalYesterday);
                this.totals.push(result.totalWeek);
                this.totals.push(result.totalMonth);
                this.panels.push(
                    {
                        id: 1,
                        type: 'info',
                        message: 'Income today : ' + this.totals[0]
                    },
                    {
                        id: 2,
                        type: 'success',
                        message: 'Income yesterday : ' + this.totals[1]
                    }, {
                        id: 3,
                        type: 'info',
                        message: 'Income current week : ' + this.totals[2]
                    }, {
                        id: 4,
                        type: 'success',
                        message: 'Income current month : ' + this.totals[3]
                    });
            },
            error => this.errorMessage = <any>error)
    }

    getTotalCurrentIncomesMock(): void {
        this.incomeService.getTotalCurrentIncomesMock().then((result) => {
            this.totals[0] = result[0].totalDay;
            this.totals[1] = result[0].totalYesterday;
            this.totals[2] = result[0].totalWeek;
            this.totals[3] = result[0].totalMonth;
        })
    }
}


export interface IPanel {
    id: number;
    type: string;
    message: string;
}

