import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './core/guards/login.guard';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LoginComponent} from './login/login.component';
import {MaintenanceComponent} from './maintenance/maintenance.component';
import {HomeComponent} from './main/home/home.component';
import {DashboardComponent} from './main/dashboard/dashboard.component';
import {ComptesComponent} from './main/comptes/comptes.component';
import {ServicesComponent} from './main/services/services.component';
import {ConsomationComponent} from './main/consomation/consomation.component';
import {ContratsComponent} from './main/comptes/contrats/contrats.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'home', component: HomeComponent},
  {path: 'maintenance', component: MaintenanceComponent},
  {path: 'dashboard', component: DashboardComponent},
  //{path: 'comptes', component: ComptesComponent},
  {path: 'comptes/contrats', component: ContratsComponent},
  {path: 'services', component: ServicesComponent},
  {path: 'consomation', component: ConsomationComponent},
  {path: '**', component: HomeComponent},
  // {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
