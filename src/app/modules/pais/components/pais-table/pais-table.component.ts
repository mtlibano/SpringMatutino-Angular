import { Component, OnInit } from '@angular/core';
import { Pais } from '../../models/pais';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-pais-table',
  templateUrl: './pais-table.component.html',
  styleUrls: ['./pais-table.component.scss'],
})
export class PaisTableComponent implements OnInit {
  list: Pais[] = [];

  constructor(private service: PaisService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getPaisForm(pais: Pais) {
    this.service.getPaisForm(pais);
  }

  delete(pais: Pais) {
    this.service.delete(pais).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
