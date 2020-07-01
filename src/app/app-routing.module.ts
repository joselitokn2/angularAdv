import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    // () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', component: NopagefoundComponent },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });
