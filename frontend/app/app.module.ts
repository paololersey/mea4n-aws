import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// ag-grid
import { AgGridModule } from "ag-grid-angular/main";
// application
import { AppComponent } from "./app.component";
import { NavigatorComponent } from "./modules/navigator/components/navigator.component";
import { GridComponent } from "./modules/control/components/grid.component";
import { TotalIncomeView } from "./modules/control/components/total-income-view.component";
import { ResetBreakdownModalComponent } from "./modules/control/components/reset-breakdown-modal.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, JsonpModule } from "@angular/http";

@NgModule({
    imports: [
        BrowserModule,
        AgGridModule.withComponents([ResetBreakdownModalComponent]
        ),
        NgbModule.forRoot(),
        HttpModule,
        JsonpModule
    ],
    declarations: [
        AppComponent,
        NavigatorComponent,
        GridComponent,
        TotalIncomeView,
        ResetBreakdownModalComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
