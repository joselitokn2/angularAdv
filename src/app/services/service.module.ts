import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModalCargaService } from '../components/modal-carga/modalCarga.service';
import { AdministradorGuard } from './guards/administrador.guard';
import { LoginGuardGuard } from './guards/login-guard.guard';
import { RenovarTokenGuard } from './guards/renovar-token.guard';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';
import {
  SettingsService,
  SharedService,
  SidebarService,
} from './service.index';
import { SubirImagenService } from './subir-imagen/subir-imagen.service';
import { UsuarioService } from './usuario/usuario.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    HospitalService,
    MedicoService,
    SubirImagenService,
    ModalCargaService,
    LoginGuardGuard,
    AdministradorGuard,
    RenovarTokenGuard,
  ],
  declarations: [],
})
export class ServiceModule {}
