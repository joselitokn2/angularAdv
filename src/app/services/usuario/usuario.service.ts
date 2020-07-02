import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Usuario } from 'src/app/models/usuario.model';
import swal from 'sweetalert';
import { SubirImagenService } from '../subir-imagen/subir-imagen.service';
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public subirImagenService: SubirImagenService
  ) {
    this.cargarStorage();
  }
  renovarToken() {
    let url = URL_SERVICIOS + '/login/renovartoken';
    url += '?token=' + this.token;
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        console.log('token renovadooooo');
        return true;
      }),
      catchError((error: any) => {
        this.router.navigate(['/login']);
        swal(
          'No se ha podido renovar el token',
          'No se pudo renovar el token',
          'error'
        );
        return throwError(error);
      })
    );
  }
  estaLogeado() {
    return this.token.length > 5 ? true : false;
  }
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log(resp);
        return true;
      })
    );
  }

  login(usuario: Usuario, recordar: boolean = false): Observable<any> {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        console.log(resp);
        return true;
      }),
      catchError((error: any) => {
        // console.log(error.error.mensaje);
        swal('Error en el login', error.error.mensaje, 'error');
        return throwError(error);
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError((error: any) => {
        swal(error.error.mensaje, error.error.errors.message, 'error');
        // swal('Fallo en el registro', 'Este email ya esta registrado', 'error');
        return throwError(error);
      })
    );
  }
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if (resp.usuario._id === this.usuario._id) {
          const usuario: Usuario = resp.usuario;
          this.guardarStorage(usuario._id, this.token, usuario, this.menu);
        }
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      }),
      catchError((error: any) => {
        swal(error.error.mensaje, error.error.errors.message, 'error');
        // swal('Fallo en el registro', 'Este email ya esta registrado', 'error');
        return throwError(error);
      })
    );
  }
  cambiarImagen(archivo: File, id: string) {
    this.subirImagenService
      .subirImagen(archivo, 'usuarios', id)
      .then((resp: any) => {
        console.log(resp);
        this.usuario.imagen = resp.usuario.imagen;
        swal('Imagen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch((response) => {
        console.log(response);
      });
  }
  cargarUsuarios(puntero: number = 0) {
    const url = URL_SERVICIOS + '/usuario?puntero=' + puntero;

    return this.http.get(url);
  }
  buscarUsuarios(textoBusqueda: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + textoBusqueda;
    return this.http.get(url).pipe(map((resp: any) => resp.usuarios));
  }
  borrarUsuarios(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(
      map((resp) => {
        swal('Usuario eliminado', 'El usuario a sido eliminado', 'success');
        return true;
      })
    );
  }
}
