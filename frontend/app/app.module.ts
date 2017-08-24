import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
// ag-grid
import { AgGridModule } from "ag-grid-angular/main";
// application
import { AppComponent } from "./app.component";
import { NavigatorComponent } from "./modules/navigator/components/navigator.component";
import { GridComponent } from "./modules/control/components/grid.component";
import { TotalIncomeView } from "./modules/control/components/total-income-view.component";
import { FormPageComponent } from './modules/login/form-page.component';
import { HomePageComponent }  from './home-page.component';
import { ReportComponent }  from './modules/report/components/report.component';
import { ResetBreakdownModalComponent } from "./modules/control/components/reset-breakdown-modal.component";
import { NgbdButtonsCheckbox} from "./modules/common/ngbd-buttons-checkbox";

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule, JsonpModule } from "@angular/http";
import { FormsModule } from '@angular/forms';
import { routing }        from './app.routing';


@NgModule({
    imports: [
        BrowserModule,
        AgGridModule.withComponents([ResetBreakdownModalComponent]
        ),     
        NgbModule.forRoot(),
        HttpModule,
        JsonpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        NavigatorComponent,
        GridComponent,
        TotalIncomeView,
        ResetBreakdownModalComponent,
        FormPageComponent,
        HomePageComponent,
        ReportComponent,
        NgbdButtonsCheckbox
    ],
   // bootstrap: [HomePageComponent]
    bootstrap: [AppComponent]
})
export class AppModule {
}
