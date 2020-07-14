import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  usuarios: Usuario[] = [];
  puntero = 0;
  totalUsuarios: number;

  constructor(public usuarioService: UsuarioService, public router: Router) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.usuario;
    this.cargarUsuarios();
  }
  buscar(busqueda: string) {
    this.router.navigate(['/buscador/' + busqueda]);
  }
  cargarUsuarios() {
    this.usuarioService.cargarUsuarios(this.puntero).subscribe((resp: any) => {
      // console.log(resp);
      this.totalUsuarios = resp.total;
      this.usuarios = resp.usuarios;
    });
  }
}
