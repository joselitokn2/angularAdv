import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsComponent } from './components.component';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { GraficoComponent } from './grafico/grafico.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,

  ],
  declarations: [
    ComponentsComponent,
    IncrementadorComponent,
    GraficoComponent
  ],
  exports : [
    IncrementadorComponent,
    GraficoComponent

            ]

})
export class ComponentsModule {

 }



