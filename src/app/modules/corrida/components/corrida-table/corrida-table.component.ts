import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { CorridaService } from '../../services/corrida.service';

@Component({
  selector: 'app-corrida-table',
  templateUrl: './corrida-table.component.html',
  styleUrls: ['./corrida-table.component.scss'],
})
export class CorridaTableComponent implements OnInit {
  list: Corrida[] = [];

  constructor(private service: CorridaService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getCorridaForm(corrida: Corrida) {
    this.service.getCorridaForm(corrida);
  }

  delete(corrida: Corrida) {
    this.service.delete(corrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
