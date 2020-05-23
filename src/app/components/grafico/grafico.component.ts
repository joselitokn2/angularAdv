import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.css']
})
export class GraficoComponent implements OnInit {

  // Doughnut
  @Input("chartLabels") doughnutChartLabels: string[] = [];
  @Input("chartData") doughnutChartData: number[] = [];
  @Input("chartType") doughnutChartType: string = '';
  constructor() { }

  ngOnInit() {
  }

}
