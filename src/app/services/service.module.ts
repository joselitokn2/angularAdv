import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SidebarService,
  SharedService,
} from './service.index';
import { UsuarioService } from './usuario/usuario.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService],
  declarations: [],
})
export class ServiceModule {}
