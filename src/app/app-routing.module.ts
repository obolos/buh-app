import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { SystemComponent } from './admin-system/system/system.component';
import { BillPageComponent } from './admin-system/bill-page/bill-page.component';
import { HistoryPageComponent } from './admin-system/history-page/history-page.component';
import { PlanningPageComponent } from './admin-system/planning-page/planning-page.component';
import { RecordsPageComponent } from './admin-system/records-page/records-page.component';
import { HistoryDetailComponent } from './admin-system/history-page/history-detail/history-detail.component';
import { AuthGardService } from './auth.gard.service';

const routes: Routes = [
{path: '', redirectTo: '/auth/login', pathMatch: 'full'},
{path: 'auth', 
component: AuthComponent,
children: [
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: '**', redirectTo: 'registration', pathMatch: 'full'}
]},
{path: 'system', redirectTo: '/system/bill', pathMatch: 'full'},
{path: 'system', 
component: SystemComponent, canActivate: [AuthGardService],
children: [
  {path: 'bill', component: BillPageComponent},
  {path: 'history', component: HistoryPageComponent},
  {path: 'history/:id', component: HistoryDetailComponent},
  {path: 'planning', component: PlanningPageComponent},
  {path: 'records', component: RecordsPageComponent}  
]},
{path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
