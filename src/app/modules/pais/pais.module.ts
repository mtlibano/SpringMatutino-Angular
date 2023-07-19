import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisFormComponent } from './components/pais-form/pais-form.component';
import { PaisTableComponent } from './components/pais-table/pais-table.component';
import { PaisComponent } from './components/pais/pais.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PaisFormComponent, PaisTableComponent, PaisComponent],
  imports: [CommonModule, FormsModule],
  exports: [PaisComponent],
})
export class PaisModule {}
