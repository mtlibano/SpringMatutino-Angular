import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html',
  styleUrls: ['./pais-form.component.scss'],
})
export class PaisFormComponent implements OnInit {
  paisSelected: Pais = {} as Pais;

  constructor(private service: PaisService) {}

  ngOnInit(): void {
    this.service.emitPais.subscribe((pais: Pais) => {
      this.paisSelected = pais;
    });
  }

  getByName(name: string) {
    this.service.getByName(name);
  }

  insert() {
    this.service.insert(this.paisSelected).subscribe((data) => {
      console.log(data);
    });
  }

  update() {
    this.service.update(this.paisSelected).subscribe((data) => {
      console.log(data);
    });
  }

  createPais() {
    if (this.paisSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.paisSelected = {} as Pais;
  }
}
