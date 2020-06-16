import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// tslint:disable-next-line: no-unused-expression
// import swal from 'sweetalert';
// import * as swal from 'sweetalert';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css'],
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  contrasenhasIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }
      return { contraseñasIguales: true };
    };
  }

  ngOnInit(): void {
    init_plugins();

    this.formulario = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        terminos: new FormControl(false),
      },
      { validators: this.contrasenhasIguales('password', 'password2') }
    );
    this.formulario.setValue({
      nombre: 'Jose',
      email: 'joselitokn2@hotmail.com',
      password: '1234',
      password2: '1234',
      terminos: true,
    });
  }

  registrarUsuario() {
    if (this.formulario.invalid) {
      return;
    }
    if (!this.formulario.value.terminos) {
      swal('Importante!', 'Debe aceptar los términos!', 'warning');
      return;
    }
    const usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.email,
      this.formulario.value.password
    );
    this.usuarioService.crearUsuario(usuario).subscribe((respuesta) => {
      // swal('Usuario Creado', this.formulario.value.email, 'success');
      this.router.navigate(['/login']);
    });
  }
}
