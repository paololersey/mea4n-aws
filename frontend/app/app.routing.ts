import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
    { path: '', component: HomePageComponent/*, canActivate: [AuthGuard] */},
    { path: 'application', component: AppComponent/*, canActivate: [AuthGuard] */},

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);