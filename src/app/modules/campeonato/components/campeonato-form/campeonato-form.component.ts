import { Component, OnInit } from '@angular/core';
import { Campeonato } from '../../models/campeonato';
import { CampeonatoService } from '../../services/campeonato.service';

@Component({
  selector: 'app-campeonato-form',
  templateUrl: './campeonato-form.component.html',
  styleUrls: ['./campeonato-form.component.scss'],
})
export class CampeonatoFormComponent implements OnInit {
  campeonatoSelected: Campeonato = {} as Campeonato;

  constructor(private service: CampeonatoService) {}

  ngOnInit(): void {
    this.service.emitCampeonato.subscribe((campeonato: Campeonato) => {
      this.campeonatoSelected = campeonato;
    });
  }

  getByDescription(descricao: string) {
    this.service.getByDescription(descricao);
  }

  getByAno(ano: string) {
    this.service.getByAno(parseInt(ano));
  }

  insert() {
    this.service.insert(this.campeonatoSelected).subscribe((data) => {
      console.log(data);
    });
  }

  update() {
    this.service.update(this.campeonatoSelected).subscribe((data) => {
      console.log(data);
    });
  }

  createCampeonato() {
    if (this.campeonatoSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.campeonatoSelected = {} as Campeonato;
  }
}
