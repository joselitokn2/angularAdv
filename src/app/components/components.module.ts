import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponentsComponent } from './components.component';
import { GraficoComponent } from './grafico/grafico.component';
import { IncrementadorComponent } from './incrementador/incrementador.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ComponentsComponent, IncrementadorComponent, GraficoComponent],
  exports: [IncrementadorComponent, GraficoComponent],
})
export class ComponentsModule {}
