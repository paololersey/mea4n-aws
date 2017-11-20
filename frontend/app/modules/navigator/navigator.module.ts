import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { NavigatorComponent } from './components/navigator.component';

@NgModule({
    imports: [SharedModule],
    declarations: [NavigatorComponent],
    exports: [NavigatorComponent]
})
export class NavigatorModule { }