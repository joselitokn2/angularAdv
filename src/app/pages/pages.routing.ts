import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from '../login/login.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { ProgressComponent } from './progress/progress.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdministradorGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MedicosComponent } from './medicos/medicos.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicoComponent } from './medicos/medico.component';
import { BuscadorComponent } from './buscador/buscador.component';

const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'graficas1',
        component: Graficas1Component,
        data: { titulo: 'Graficas' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
      {
        path: 'account-settings',
        component: AccoutSettingsComponent,
        data: { titulo: 'Ajustes del Tema' },
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      {
        path: 'buscador/:busqueda',
        component: BuscadorComponent,
        data: { titulo: 'Buscador' },
      },
      // Administrador
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AdministradorGuard],
        data: { titulo: 'Administrador de usuarios' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Administrador de medicos' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Actualizar medico' },
      },
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Administrador de hospitales' },
      },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
