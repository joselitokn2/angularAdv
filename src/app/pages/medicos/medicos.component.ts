import { Component, OnInit } from '@angular/core';
import { MedicoService } from 'src/app/services/medico/medico.service';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Medico } from 'src/app/models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  puntero: number = 0;
  totalMedicos: number = 0;
  constructor(public medicoService: MedicoService) {}

  ngOnInit(): void {
    this.obtenerMedicos();
  }
  buscarMedico(busqueda: string) {
    if (busqueda.length <= 0) {
      this.obtenerMedicos();
      return;
    }
    this.medicoService.buscarMedicos(busqueda).subscribe((resp) => {
      this.medicos = resp;
    });
  }

  obtenerMedicos() {
    this.medicoService.cargarMedicos(this.puntero).subscribe((resp: any) => {
      this.medicos = resp.medicos;
      this.totalMedicos = resp.total;
    });
  }

  borrarMedico(medico: Medico) {
    this.medicoService
      .eliminarMedico(medico._id)
      .subscribe((resp) => this.obtenerMedicos());
  }
  cambiarPuntero(valor: number) {
    // tslint:disable-next-line: prefer-const
    let puntero = this.puntero + valor;

    if (puntero >= this.totalMedicos) {
      return;
    }
    if (puntero < 0) {
      return;
    }

    this.puntero += valor;
    //  console.log(this.puntero);
    this.obtenerMedicos();
  }
}
