import { Component, OnInit } from '@angular/core';
import { PilotoCorridaDto } from '../../models/piloto-corrida-dto';
import { PilotoCorridaService } from '../../services/piloto-corrida.service';

@Component({
  selector: 'app-piloto-corrida-table',
  templateUrl: './piloto-corrida-table.component.html',
  styleUrls: ['./piloto-corrida-table.component.scss'],
})
export class PilotoCorridaTableComponent implements OnInit {
  list: PilotoCorridaDto[] = [];

  constructor(private service: PilotoCorridaService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getPilotoCorridaForm(pilotoCorrida: PilotoCorridaDto) {
    this.service.getPilotoCorridaForm(pilotoCorrida);
  }

  delete(pilotoCorrida: PilotoCorridaDto) {
    this.service.delete(pilotoCorrida).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
