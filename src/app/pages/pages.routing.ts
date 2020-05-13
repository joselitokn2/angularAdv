import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { Graficas1Component } from './graficas1/graficas1.component';




const pagesRoutes: Routes = [
  {           path: '',
  component: PagesComponent,
  children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'progress', component: LoginComponent},
    {path: 'graficas1', component: Graficas1Component},
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'}
  ]},
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
