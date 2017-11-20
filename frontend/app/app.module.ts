import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

//* SharedModule: all external libs */
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';

/* Features modules  **/
import { OnlineReadingModule } from './modules/onlineReading/online-reading.module';
import { ReportModule } from './modules/report/report.module';
import { NavigatorModule } from './modules/navigator/navigator.module';

// application
import { AppComponent } from "./app.component";
import { FormPageComponent } from './modules/login/form-page.component';
import { HomePageComponent } from './home-page.component';
import { routing } from './app.routing';


@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule,
        routing,

        //features modules
        NavigatorModule,
        OnlineReadingModule,
        ReportModule
    ],
    declarations: [
        AppComponent,
        FormPageComponent,
        HomePageComponent
    ],
    // bootstrap: [HomePageComponent]
    bootstrap: [AppComponent]
})
export class AppModule {
}
