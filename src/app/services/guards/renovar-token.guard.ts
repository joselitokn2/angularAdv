import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root',
})
export class RenovarTokenGuard implements CanActivate {
  constructor(public usuarioService: UsuarioService, public router: Router) {}

  canActivate(): Promise<boolean> | boolean {
    // console.log(' en proceso de renovar el token');
    const token = this.usuarioService.token;
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expirado = this.expiracionToken(payload.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    // console.log(payload);
    return this.renovarToken(payload.exp);
  }
  renovarToken(fechaExpiracion: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tokenExpiracion = new Date(fechaExpiracion * 1000);
      const ahora = new Date();
      ahora.setTime(ahora.getTime() + 1 * 60 * 60 * 1000); // Si falta una hora para que el token expire
      // console.log(tokenExpiracion);
      // console.log(ahora);
      if (tokenExpiracion.getTime() > ahora.getTime()) {
        resolve(true);
      } else {
        this.usuarioService.renovarToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate(['/login']);
            reject(false);
          }
        );
      }
    });
  }

  expiracionToken(fechaExpiracion: number) {
    const ahora = new Date().getTime() / 1000;
    if (fechaExpiracion < ahora) {
      return true;
    } else {
      return false;
      // No ha expirado
    }
  }
}
