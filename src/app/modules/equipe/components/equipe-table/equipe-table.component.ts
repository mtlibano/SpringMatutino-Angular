import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../models/equipe';
import { EquipeService } from '../../services/equipe.service';

@Component({
  selector: 'app-equipe-table',
  templateUrl: './equipe-table.component.html',
  styleUrls: ['./equipe-table.component.scss'],
})
export class EquipeTableComponent implements OnInit {
  list: Equipe[] = [];

  constructor(private service: EquipeService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getEquipeForm(equipe: Equipe) {
    this.service.getEquipeForm(equipe);
  }

  delete(equipe: Equipe) {
    this.service.delete(equipe).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
