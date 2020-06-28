import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {
  SettingsService,
  SidebarService,
  SharedService,
} from './service.index';
import { UsuarioService } from './usuario/usuario.service';
import { SubirImagenService } from './subir-imagen/subir-imagen.service';
import { ModalCargaService } from '../components/modal-carga/modalCarga.service';
import { HospitalService } from './hospital/hospital.service';
import { MedicoService } from './medico/medico.service';

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
  ],
  declarations: [],
})
export class ServiceModule {}
