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
    this.service.listAll().subscribe((data) => {
      this.list = data;
    });
  }

  getUserForm(user: User) {
    this.service.getUserForm(user);
  }

  delete(user: User) {
    this.service.delete(user).subscribe(() => {
      this.service.listAll().subscribe((data) => {
        this.list = data;
      });
    });
  }
}
