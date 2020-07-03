import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: [],
})
export class Graficas1Component implements OnInit {
  graficos: any = {
    grafico1: {
      labels: ['Mantequilla', 'Mermelada', 'Chorizo'],
      data: [24, 20, 45],
      type: 'doughnut',
      leyenda: 'El pan se come con',
    },
    grafico2: {
      labels: ['Hombres', 'Mujeres'],
      data: [2300, 4100],
      type: 'doughnut',
      leyenda: 'Entrevistados',
    },
    grafico3: {
      labels: ['Si', 'No'],
      data: [2, 5410],
      type: 'doughnut',
      leyenda: '¿Pizza con piña?',
    },
    grafico4: {
      labels: ['¿McDonads', 'BurguerKing'],
      data: [85, 97],
      type: 'doughnut',
      leyenda: '¿McDonads o BurguerKing?',
    },
  };

  constructor() {}

  ngOnInit(): void {}
}
