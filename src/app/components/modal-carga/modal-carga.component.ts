import { Component, OnInit, Injectable } from '@angular/core';
import swal from 'sweetalert';
import { SubirImagenService } from 'src/app/services/service.index';
import { ModalCargaService } from './modalCarga.service';

@Component({
  selector: 'app-modal-carga',
  templateUrl: './modal-carga.component.html',
  styleUrls: ['./modal-carga.component.css'],
})
export class ModalCargaComponent implements OnInit {
  // oculto: string = '';
  imagenParaSubir: File;
  imagenTemporal: string;
  constructor(
    public subirImagenService: SubirImagenService,
    public modalCargaService: ModalCargaService
  ) {}

  ngOnInit(): void {}
  selectImagen(archivo: File) {
    if (!archivo) {
      this.imagenParaSubir = null;
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal(
        'Solo imagenes',
        'El archivo seleccionado debe ser una imagen',
        'error'
      );
      this.imagenParaSubir = null;
      return;
    }
    this.imagenParaSubir = archivo;
    // tslint:disable-next-line: prefer-const
    let reader = new FileReader();
    // tslint:disable-next-line: prefer-const
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => {
      console.log(reader.result);

      this.imagenTemporal = reader.result as string;
    };
  }
  cambiarImagen() {
    this.subirImagenService
      .subirImagen(
        this.imagenParaSubir,
        this.modalCargaService.tipo,
        this.modalCargaService.id
      )
      .then((resp) => {
        this.modalCargaService.notificacion.emit(resp);
        this.cerrarModal();
      })
      .catch((err) => {
        console.log('Error en la subida de la imagen');
      });
  }
  cerrarModal() {
    this.imagenTemporal = null;
    this.imagenParaSubir = null;
    this.modalCargaService.ocultarModal();
  }
}
