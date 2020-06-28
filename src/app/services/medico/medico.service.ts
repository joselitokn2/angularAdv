import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { UsuarioService } from '../usuario/usuario.service';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  totalMedicos: number = 0;
  constructor(public http: HttpClient, public usuarioService: UsuarioService) {}
  obtenerMedicos() {
    const url = URL_SERVICIOS + '/medico';
    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalMedicos = resp.total;
        return resp.medicos;
      })
    );
  }
  cargarMedicos(puntero: number = 0) {
    const url = URL_SERVICIOS + '/medico?puntero=' + puntero;

    return this.http.get(url);
  }
  obtenerMedico(id: string) {
    const url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp.medico;
      })
    );
  }
  buscarMedicos(textoBusqueda: string) {
    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + textoBusqueda;
    return this.http.get(url).pipe(map((resp: any) => resp.medicos));
  }
  eliminarMedico(id: string) {
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this.usuarioService.token;
    return this.http.delete(url).pipe(
      map((resp: any) => {
        swal('Médico Eliminado', 'Médico eliminado correctamente', 'success');
        return resp;
      })
    );
  }
  nuevoMedico(medico: Medico) {
    let url = URL_SERVICIOS + '/medico';

    if (medico._id) {
      // actualizando
      url += '/' + medico._id;
      url += '?token=' + this.usuarioService.token;

      return this.http.put(url, medico).pipe(
        map((resp: any) => {
          swal('Médico Actualizado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    } else {
      // creando
      url += '?token=' + this.usuarioService.token;
      return this.http.post(url, medico).pipe(
        map((resp: any) => {
          swal('Médico Creado', medico.nombre, 'success');
          return resp.medico;
        })
      );
    }
  }
}
