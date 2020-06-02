import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscripcion: Subscription;
  constructor() {
    this.subscripcion = this.devuelveObservable().subscribe(
      (numero) => console.log('Subscribe', numero),
      (error) => console.log('Error en el Observable', error),
      () => console.log('El observador termino')
    );
  }

  ngOnInit(): void {}
  ngOnDestroy() {
    console.log('pagina rxjs cerrada, cerrar observable');
    this.subscripcion.unsubscribe();
  }

  devuelveObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador++;

        const salida = {
          valor: contador,
        };
        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }
        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Precaución');
        // }
      }, 1000);
    }).pipe(
      map((respuesta) => respuesta.valor),
      filter((valor, index) => {
        //  console.log('Filter', valor, index);
        if (valor % 2 === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }
}
