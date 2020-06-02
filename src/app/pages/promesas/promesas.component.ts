import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css'],
})
export class PromesasComponent implements OnInit {
  constructor() {
    this.contarTres()
      .then((mensaje) => console.log('Terminado', mensaje))
      .catch((error) => console.error('Error en la promesa', error));
  }

  ngOnInit(): void {}
  contarTres() {
    return new Promise((resolve, reject) => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          resolve('Ok');
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }
}
