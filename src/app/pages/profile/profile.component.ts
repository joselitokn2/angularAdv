import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenParaSubir: File;
  imagenTemporal: string;

  constructor(public usuarioService: UsuarioService) {
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {}
  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if (this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.email = usuario.email;

    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
  }
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
    // lo disparamos desde usuario Service
    this.usuarioService.cambiarImagen(this.imagenParaSubir, this.usuario._id);
  }
}
