import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';
import { GlobalService } from '../../../../global.service';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
})
export class TableUsersComponent implements OnInit {
  list: User[] = [];

  constructor(
    private service: UserServiceService,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    // this.globalService.getToken('max@email.com', '1234').subscribe(() => {
    //   this.service.listAll().subscribe((data) => {
    //     this.list = data;
    //   });
    // });
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
