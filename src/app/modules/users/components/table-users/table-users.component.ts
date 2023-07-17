import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent implements OnInit {
  list: User[] = [];

  constructor(private service: UserServiceService) {}

  ngOnInit(): void {
    this.service.getUsers().subscribe((data) => {
      this.list = data;
    });

    this.service.emitEvent.subscribe((user) => {
      this.list = user;
    });
  }
}
