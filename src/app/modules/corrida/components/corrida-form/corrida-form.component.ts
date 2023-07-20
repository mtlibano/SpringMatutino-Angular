import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { Pista } from '../../../pista/models/pista';
import { Campeonato } from '../../../campeonato/models/campeonato';
import { CorridaService } from '../../services/corrida.service';
import { PistaService } from '../../../pista/services/pista.service';
import { CampeonatoService } from '../../../campeonato/services/campeonato.service';

@Component({
  selector: 'app-corrida-form',
  templateUrl: './corrida-form.component.html',
  styleUrls: ['./corrida-form.component.scss'],
})
export class CorridaFormComponent implements OnInit {
  corridaSelected: Corrida = {} as Corrida;
  pistaList: Pista[] = [];
  campeonatoList: Campeonato[] = [];

  constructor(
    private service: CorridaService,
    private servicePista: PistaService,
    private serviceCampeonato: CampeonatoService
  ) {}

  ngOnInit(): void {
    this.service.emitCorrida.subscribe((corrida: Corrida) => {
      this.corridaSelected = corrida;
    });
    this.servicePista.listAll().subscribe((data) => {
      this.pistaList = data;
    });
    this.serviceCampeonato.listAll().subscribe((data) => {
      this.campeonatoList = data;
    });
  }

  getByData() {
    this.service.getByData(this.corridaSelected.data);
  }

  getByPista() {
    this.service.getByPista(this.corridaSelected.pistaId);
  }

  getByCampeonato() {
    this.service.getByCampeonato(this.corridaSelected.campeonatoId);
  }

  insert() {
    this.service.insert(this.corridaSelected).subscribe((data) => {
      console.log(data);
    });
  }

  update() {
    this.service.update(this.corridaSelected).subscribe((data) => {
      console.log(data);
    });
  }

  createPista() {
    console.log(this.corridaSelected);
    if (this.corridaSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.corridaSelected = {} as Corrida;
  }
}
