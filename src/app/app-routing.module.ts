import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { RegistrerComponent } from './login/registrer.component';


const routes: Routes = [
  {           path: '',
              component: PagesComponent,
              children: [
                {path: 'dashboard', component: DashboardComponent},
                {path: 'progress', component: LoginComponent},
                {path: 'graficas1', component: Graficas1Component},
                {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
              ]},

  {path: 'login', component: LoginComponent},
  {path: 'registrer', component: RegistrerComponent},
  {path: '**', component: NopagefoundComponent}
];


  export const APP_ROUTES = RouterModule.forRoot( routes, { useHash: true } );

