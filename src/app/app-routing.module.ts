import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './core/guards/login.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {HomeComponent} from './main/home/home.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {AccountComponent} from './main/account/account.component';
import {ConsumptionComponent} from './main/consumption/consumption.component';
import {MyServicesComponent} from './main/my-services/my-services.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'account', component: AccountComponent},
  {path: 'my-services', component: MyServicesComponent},
  {path: 'consumption', component: ConsumptionComponent},
  {path: 'maintenance', component: MaintenanceComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
