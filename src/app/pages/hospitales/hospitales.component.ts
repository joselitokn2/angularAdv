import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/service.index';
import { ModalCargaService } from 'src/app/components/modal-carga/modalCarga.service';

declare var swal: any;
@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css'],
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  constructor(
    public hospitalService: HospitalService,
    public modalCargaService: ModalCargaService
  ) {}

  ngOnInit(): void {
    this.obtenerHospitales();
    this.modalCargaService.notificacion.subscribe(() =>
      this.obtenerHospitales()
    );
  }
  obtenerHospitales() {
    this.hospitalService.obtenerHospitales().subscribe((hospitales) => {
      this.hospitales = hospitales;
    });
  }
  buscarHospital(busqueda: string) {
    if (busqueda.length <= 0) {
      this.obtenerHospitales();
      return;
    }
    this.hospitalService.buscarHospital(busqueda).subscribe((resp) => {
      this.hospitales = resp;
    });
  }
  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital).subscribe();
  }
  eliminarHospital(hospital: Hospital) {
    this.hospitalService.borrarHospital(hospital._id).subscribe((resp) => {
      this.obtenerHospitales();
    });
  }
  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: '',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,
    }).then((valor: string) => {
      if (!valor || valor.length === 0) {
        return;
      }
      this.hospitalService
        .crearHospital(valor)
        .subscribe(() => this.obtenerHospitales());
    });
  }
  actualizarImagen(hospital: Hospital) {
    this.modalCargaService.mostrarModal('hospitales', hospital._id);
  }
}
