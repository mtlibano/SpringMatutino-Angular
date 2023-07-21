import { Component, OnInit } from '@angular/core';
import { Piloto } from '../../models/piloto';
import { PilotoService } from '../../services/piloto.service';
import { EquipeService } from '../../../equipe/services/equipe.service';
import { PaisService } from '../../../pais/services/pais.service';
import { Pais } from '../../../pais/models/pais';
import { Equipe } from '../../../equipe/models/equipe';
import { PilotoDto } from '../../models/piloto-dto';

@Component({
  selector: 'app-piloto-form',
  templateUrl: './piloto-form.component.html',
  styleUrls: ['./piloto-form.component.scss'],
})
export class PilotoFormComponent implements OnInit {
  pilotoSelected: Piloto = {} as Piloto;
  equipeList: Equipe[] = [];
  paisList: Pais[] = [];

  constructor(
    private service: PilotoService,
    private serviceEquipe: EquipeService,
    private servicePais: PaisService
  ) {}

  ngOnInit(): void {
    this.service.emitPiloto.subscribe((piloto: Piloto) => {
      this.pilotoSelected = piloto;
    });
    this.serviceEquipe.listAll().subscribe((data) => {
      this.equipeList = data;
    });
    this.servicePais.listAll().subscribe((data) => {
      this.paisList = data;
    });
  }

  getByName() {
    this.service.getByName(this.pilotoSelected.name);
  }

  getByEquipe() {
    this.service.getByEquipe(this.pilotoSelected.equipe.id);
  }

  getByPais() {
    this.service.getByPais(this.pilotoSelected.pais.id);
  }

  insert() {
    const pilotoMapper: PilotoDto = {
      name: this.pilotoSelected.name,
      idEquipe: this.pilotoSelected.equipe.id,
      idPais: this.pilotoSelected.pais.id,
    };
    this.service.insert(pilotoMapper).subscribe();
  }

  update() {
    const pilotoMapper: PilotoDto = {
      name: this.pilotoSelected.name,
      idEquipe: this.pilotoSelected.equipe.id,
      idPais: this.pilotoSelected.pais.id,
    };
    this.service.update(pilotoMapper).subscribe();
  }

  createPiloto() {
    if (this.pilotoSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.pilotoSelected = {} as Piloto;
  }
}
