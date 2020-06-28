import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService, HospitalService } from 'src/app/services/service.index';
import { NgForm } from '@angular/forms';
import { Hospital } from 'src/app/models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalCargaService } from 'src/app/components/modal-carga/modalCarga.service';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css'],
})
export class MedicoComponent implements OnInit {
  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', '', '', '', '');
  hospital: Hospital = new Hospital('');
  constructor(
    public medicoService: MedicoService,
    public hospitalService: HospitalService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalCargaService: ModalCargaService
  ) {
    activatedRoute.params.subscribe((params) => {
      const id = params.id;
      if (id !== 'nuevo') {
        this.obtenerMedico(id);
      }
    });
  }

  ngOnInit(): void {
    this.hospitalService.obtenerHospitales().subscribe((resp) => {
      this.hospitales = resp;
    });
    this.modalCargaService.notificacion.subscribe((resp) => {
      //  console.log(resp);
      this.medico.imagen = resp.medico.imagen;
    });
  }
  nuevoMedico(formulario: NgForm) {
    // console.log(formulario.valid);
    // console.log(formulario.value);
    if (formulario.invalid) {
      return;
    }

    this.medicoService.nuevoMedico(this.medico).subscribe((resp) => {
      // console.log(resp);
      this.medico._id = resp._id;
      this.router.navigate(['/medico', resp._id]);
    });
  }
  cambioHospital(id: string) {
    this.hospitalService.obteneHospital(id).subscribe((resp) => {
      //  console.log(resp);
      this.hospital = resp;
    });
  }
  obtenerMedico(id: string) {
    this.medicoService.obtenerMedico(id).subscribe((medico) => {
      this.medico = medico;
      this.medico.hospital = medico.hospital._id;
      this.cambioHospital(this.medico.hospital);
    });
  }
  cambiarImagenMedico() {
    this.modalCargaService.mostrarModal('medicos', this.medico._id);
  }
}
