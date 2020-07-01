import { NgModule } from '@angular/core';
// temporal
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// RUTAS
import { APP_ROUTES } from './app-routing.module';
// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
// Servicios
import { ServiceModule } from './services/service.module';
import { SharedModule } from './shared/shared.module';

// import { ImagenPipe } from './pipes/imagen.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule,
    FormsModule,
    ServiceModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
