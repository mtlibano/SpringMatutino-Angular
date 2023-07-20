import { Component, OnInit } from '@angular/core';
import { Piloto } from '../../models/piloto';
import { PilotoService } from '../../services/piloto.service';
import { PilotoDto } from '../../models/piloto-dto';

@Component({
  selector: 'app-piloto-table',
  templateUrl: './piloto-table.component.html',
  styleUrls: ['./piloto-table.component.scss'],
})
export class PilotoTableComponent implements OnInit {
  list: PilotoDto[] = [];

  constructor(private service: PilotoService) {}

  ngOnInit(): void {
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getPilotoForm(piloto: PilotoDto) {
    this.service.getPilotoForm(piloto);
  }

  delete(piloto: PilotoDto) {
    this.service.delete(piloto).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
