import { Component, OnInit } from '@angular/core';
import { Pista } from '../../models/pista';
import { PistaService } from '../../services/pista.service';
import { Pais } from '../../../pais/models/pais';
import { PaisService } from '../../../pais/services/pais.service';

@Component({
  selector: 'app-pista-form',
  templateUrl: './pista-form.component.html',
  styleUrls: ['./pista-form.component.scss'],
})
export class PistaFormComponent implements OnInit {
  pistaSelected: Pista = {} as Pista;
  list: Pais[] = [];
  isMenuOpen: boolean = false;

  constructor(
    private service: PistaService,
    private servicePais: PaisService
  ) {}

  ngOnInit(): void {
    this.service.emitPista.subscribe((pista: Pista) => {
      this.pistaSelected = pista;
    });
    this.servicePais.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  getByTamanho(tamanho: string) {
    this.service.getByTamanho(parseInt(tamanho));
  }

  getByPais() {
    console.log(this.pistaSelected.pais.id);
    this.service.getByPais(this.pistaSelected.pais.id);
  }

  insert() {
    this.service.insert(this.pistaSelected).subscribe((data) => {
      console.log(data);
    });
  }

  update() {
    this.service.update(this.pistaSelected).subscribe((data) => {
      console.log(data);
    });
  }

  createPista() {
    console.log(this.pistaSelected);
    if (this.pistaSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.pistaSelected = {} as Pista;
  }
}
