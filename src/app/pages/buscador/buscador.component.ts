import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];

  constructor(public activatedRoute: ActivatedRoute, public http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const busqueda = params.busqueda;
      this.buscar(busqueda);
    });
  }
  buscar(busqueda: string) {
    // tslint:disable-next-line: prefer-const
    let url = URL_SERVICIOS + '/busqueda/todo/' + busqueda;
    this.http.get(url).subscribe((resp: any) => {
      console.log(resp);
      this.usuarios = resp.usuarios;
      this.medicos = resp.medicos;
      this.hospitales = resp.hospitales;
    });
  }
}
