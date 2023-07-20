import { Component, OnInit } from '@angular/core';
import { CorridaService } from '../../services/corrida.service';
import { CorridaDto } from '../../models/corrida-dto';

@Component({
  selector: 'app-corrida-table',
  templateUrl: './corrida-table.component.html',
  styleUrls: ['./corrida-table.component.scss'],
})
export class CorridaTableComponent implements OnInit {
  list: CorridaDto[] = [];

  constructor(private service: CorridaService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getCorridaForm(corrida: CorridaDto) {
    this.service.getCorridaForm(corrida);
  }

  delete(corrida: CorridaDto) {
    this.service.delete(corrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
