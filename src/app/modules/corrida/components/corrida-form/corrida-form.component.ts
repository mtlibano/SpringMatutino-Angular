import { Component, OnInit } from '@angular/core';
import { Corrida } from '../../models/corrida';
import { Pista } from '../../../pista/models/pista';
import { Campeonato } from '../../../campeonato/models/campeonato';
import { CorridaService } from '../../services/corrida.service';
import { PistaService } from '../../../pista/services/pista.service';
import { CampeonatoService } from '../../../campeonato/services/campeonato.service';
import { CorridaDto } from '../../models/corrida-dto';

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
    const [year, month, day] = this.corridaSelected.data.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    this.service.getByData(formattedDate);
  }

  getByPista() {
    this.service.getByPista(this.corridaSelected.pista.id);
  }

  getByCampeonato() {
    this.service.getByCampeonato(this.corridaSelected.campeonato.id);
  }

  insert() {
    const [year, month, day] = this.corridaSelected.data.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    const corridaMapper: CorridaDto = {
      data: formattedDate,
      pistaId: this.corridaSelected.pista.id,
      campeonatoId: this.corridaSelected.campeonato.id,
    };
    console.log(corridaMapper);
    this.service.insert(corridaMapper).subscribe();
  }

  update() {
    const [year, month, day] = this.corridaSelected.data.split('-');
    const formattedDate = `${day}-${month}-${year}`;
    const corridaMapper: CorridaDto = {
      data: formattedDate,
      pistaId: this.corridaSelected.pista.id,
      campeonatoId: this.corridaSelected.campeonato.id,
    };
    console.log(corridaMapper);
    this.service.update(corridaMapper).subscribe();
  }

  createPista() {
    if (this.corridaSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.corridaSelected = {} as Corrida;
  }
}
