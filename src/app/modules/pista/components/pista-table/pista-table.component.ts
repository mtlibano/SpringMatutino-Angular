import { Component, OnInit } from '@angular/core';
import { Pista } from '../../models/pista';
import { PistaService } from '../../services/pista.service';

@Component({
  selector: 'app-pista-table',
  templateUrl: './pista-table.component.html',
  styleUrls: ['./pista-table.component.scss'],
})
export class PistaTableComponent implements OnInit {
  list: Pista[] = [];

  constructor(private service: PistaService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getPistaForm(pista: Pista) {
    this.service.getPistaForm(pista);
  }

  delete(pista: Pista) {
    this.service.delete(pista).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
