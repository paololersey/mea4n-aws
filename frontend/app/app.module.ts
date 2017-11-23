import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

//* SharedModule: all external libs */
import { SharedModule } from './modules/shared/shared.module';
import { CoreModule } from './modules/core/core.module';

/* Features modules  **/
import { OnlineReadingModule } from './modules/onlineReading/online-reading.module';
import { ReportModule } from './modules/report/report.module';
import { NavigatorModule } from './modules/navigator/navigator.module';
import { LoginModule } from './modules/login/login.module';
import { MainModule } from './modules/main/main.module';

// application
import { AppComponent } from "./app.component";
import { RootComponent } from './root.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule,
        AppRoutingModule,

        //features modules
        NavigatorModule,
        LoginModule,
        MainModule,
        OnlineReadingModule,
        ReportModule
    ],
    declarations: [
        RootComponent,
        AppComponent
    ],
    bootstrap: [RootComponent]
    //// bootstrap: [AppComponent]
})
export class AppModule {
}
