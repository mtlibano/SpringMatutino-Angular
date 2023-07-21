import { Component, OnInit } from '@angular/core';
import { PilotoCorrida } from '../../models/piloto-corrida';
import { Piloto } from '../../../piloto/models/piloto';
import { Corrida } from '../../../corrida/models/corrida';
import { PilotoCorridaService } from '../../services/piloto-corrida.service';
import { PilotoService } from '../../../piloto/services/piloto.service';
import { CorridaService } from '../../../corrida/services/corrida.service';
import { PilotoDto } from '../../../piloto/models/piloto-dto';
import { CorridaDto } from '../../../corrida/models/corrida-dto';
import { PilotoCorridaDto } from '../../models/piloto-corrida-dto';

@Component({
  selector: 'app-piloto-corrida-form',
  templateUrl: './piloto-corrida-form.component.html',
  styleUrls: ['./piloto-corrida-form.component.scss'],
})
export class PilotoCorridaFormComponent implements OnInit {
  pilotoCorridaSelected: PilotoCorrida = {} as PilotoCorrida;
  pilotoList: PilotoDto[] = [];
  corridaList: CorridaDto[] = [];

  constructor(
    private service: PilotoCorridaService,
    private servicePiloto: PilotoService,
    private serviceCorrida: CorridaService
  ) {}

  ngOnInit(): void {
    this.service.emitPilotoCorrida.subscribe((pilotoCorrida: PilotoCorrida) => {
      this.pilotoCorridaSelected = pilotoCorrida;
    });
    this.servicePiloto.listAll().subscribe((data) => {
      this.pilotoList = data;
    });
    this.serviceCorrida.listAll().subscribe((data) => {
      this.corridaList = data;
    });
  }

  getByColocacao() {
    this.service.getByColocacao(this.pilotoCorridaSelected.colocacao);
  }

  getByPiloto() {
    this.service.getByPiloto(this.pilotoCorridaSelected.piloto.id);
  }

  getByCorrida() {
    this.service.getByCorrida(this.pilotoCorridaSelected.corrida.id);
  }

  insert() {
    const pilotoMapper: PilotoCorridaDto = {
      colocacao: this.pilotoCorridaSelected.colocacao,
      idPiloto: this.pilotoCorridaSelected.piloto.id,
      idCorrida: this.pilotoCorridaSelected.corrida.id,
    };
    this.service.insert(pilotoMapper).subscribe();
  }

  update() {
    const pilotoMapper: PilotoCorridaDto = {
      colocacao: this.pilotoCorridaSelected.colocacao,
      idPiloto: this.pilotoCorridaSelected.piloto.id,
      idCorrida: this.pilotoCorridaSelected.corrida.id,
    };
    this.service.update(pilotoMapper).subscribe();
  }

  createPilotoCorrida() {
    if (this.pilotoCorridaSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.pilotoCorridaSelected = {} as PilotoCorrida;
  }
}
