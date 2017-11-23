import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { MainComponent} from './modules/main/main.component'
import { NavigatorComponent} from './modules/navigator/components/navigator.component'
import { NgModule }             from '@angular/core';

const appRoutes: Routes = [
    { path: '', component: LoginComponent /*, canActivate: [AuthGuard] */},
    { path: 'application', component: MainComponent/*, loadChildren: 'modules/main/main.module#MainModule',*//*, canActivate: [AuthGuard] */},
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true // <-- debugging purposes only
       // preloadingStrategy: SelectivePreloadingStrategy,
      }
    )
  ],
  exports: [
    RouterModule
  ]
  /*providers: [
    CanDeactivateGuard,
    SelectivePreloadingStrategy
  ]*/
})
export class AppRoutingModule { }
