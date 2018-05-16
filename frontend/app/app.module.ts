import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

//* SharedModule: all external libs */
import { SharedModule } from './modules/shared/shared.module';

//* SharedModule: all common services */
import { CoreModule } from './modules/core/core.module';

/* Routing */
import { AppRoutingModule } from './app-routing.module';

/* Features modules  **/
import { OnlineReadingModule } from './modules/onlineReading/online-reading.module';
import { ReportModule } from './modules/report/report.module';
import { NavigatorModule } from './modules/navigator/navigator.module';

// application
import { RootComponent } from './root.component';

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule,
        NavigatorModule,
        AppRoutingModule,
        
        /* login is on-demand */ 

        /* features modules inside Main*/
        
    ],
    declarations: [
        RootComponent
        
    ],
    bootstrap: [RootComponent]
})
export class AppModule {
}
