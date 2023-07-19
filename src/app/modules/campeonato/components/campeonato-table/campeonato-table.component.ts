import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-campeonato-table',
  templateUrl: './campeonato-table.component.html',
  styleUrls: ['./campeonato-table.component.scss'],
})
export class CampeonatoTableComponent implements OnInit {
  list: Campeonato[] = [];

  constructor(private service: CampeonatoService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getCampeonatoForm(campeonato: Campeonato) {
    this.service.getCampeonatoForm(campeonato);
  }

  delete(campeonato: Campeonato) {
    this.service.delete(campeonato).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
