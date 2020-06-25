import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import { ModalCargaService } from 'src/app/components/modal-carga/modalCarga.service';

declare var swal: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  puntero: number = 0;
  totalUsuarios: number = 0;
  cargando: boolean = true;

  constructor(
    public usuarioService: UsuarioService,
    public modalCargaService: ModalCargaService
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
    this.modalCargaService.notificacion.subscribe((resp) => {
      this.cargarUsuarios();
    });
  }
  cargarUsuarios() {
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.puntero).subscribe((resp: any) => {
      // console.log(resp);
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }
  cambiarPuntero(valor: number) {
    // tslint:disable-next-line: prefer-const
    let puntero = this.puntero + valor;

    if (puntero >= this.totalUsuarios) {
      return;
    }
    if (puntero < 0) {
      return;
    }

    this.puntero += valor;
    //  console.log(this.puntero);
    this.cargarUsuarios();
  }
  buscarUsuario(busqueda: string) {
    if (busqueda.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    // console.log(busqueda);
    this.usuarioService
      .buscarUsuarios(busqueda)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }
  borrarUsuario(usuario: Usuario) {
    if (usuario._id === this.usuarioService.usuario._id) {
      swal(
        'No puede borrar este usuario',
        'No se puede borrar a si mismo',
        'error'
      );
      return;
    }
    swal({
      title: 'Estas seguro?',
      text: 'Estas a punto de eliminar a  ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((eliminar) => {
      //  console.log(eliminar);
      if (eliminar) {
        this.usuarioService.borrarUsuarios(usuario._id).subscribe((borrado) => {
          // console.log(borrado);
          this.cargarUsuarios();
        });
      }
    });
  }
  guardarUsuario(usuario: Usuario) {
    this.usuarioService.actualizarUsuario(usuario).subscribe();
  }
  mostrarModal(id: string) {
    this.modalCargaService.mostrarModal('usuarios', id);
  }
}
