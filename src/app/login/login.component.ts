import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router, public usuarioService: UsuarioService) {}

  ngOnInit(): void {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id:
          '583861109958-kn3muaarp2fkt9pprfgo3v07e99kijpr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSignin(document.getElementById('botonGoogle'));
    });
  }
  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.usuarioService.loginGoogle(token).subscribe(() => {
        window.location.href = '#/dashboard';
      });
    });
  }
  ingresar(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    const usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.password
    );
    this.usuarioService
      .login(usuario, formulario.value.recuerdame)
      .subscribe((resp) => {
        this.router.navigate(['/dashboard']);
      });
  }
}
