import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { LoginRoutingModule } from './login.routing';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [SharedModule, LoginRoutingModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class LoginModule { }