import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../models/equipe';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-equipe-form',
  templateUrl: './equipe-form.component.html',
  styleUrls: ['./equipe-form.component.scss'],
})
export class EquipeFormComponent implements OnInit {
  equipeSelected: Equipe = {} as Equipe;

  constructor(private service: EquipeService) {}

  ngOnInit(): void {
    this.service.emitEquipe.subscribe((equipe: Equipe) => {
      this.equipeSelected = equipe;
    });
  }

  getByName(name: string) {
    this.service.getByName(name);
  }

  insert() {
    this.service.insert(this.equipeSelected).subscribe((data) => {
      console.log(data);
    });
  }

  update() {
    this.service.update(this.equipeSelected).subscribe((data) => {
      console.log(data);
    });
  }

  createEquipe() {
    if (this.equipeSelected.id) {
      this.update();
    } else {
      this.insert();
    }
    this.equipeSelected = {} as Equipe;
  }
}
