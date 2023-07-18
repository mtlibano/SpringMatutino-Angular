import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent implements OnInit {
  userSelected: User = {} as User;

  constructor(private service: UserServiceService) {}

  ngOnInit(): void {
    this.service.emitUser.subscribe((user: User) => {
      this.userSelected = user;
    });
  }

  getUserName(name: string) {
    this.service.getUsersByName(name);
  }

  insertUser() {
    this.service.insert(this.userSelected).subscribe((data) => {
      console.log(data);
    });
  }

  updateUser() {
    this.service.update(this.userSelected).subscribe((data) => {
      console.log(data);
    });
  }

  createUser() {
    if (this.userSelected.id) {
      this.updateUser();
    } else {
      this.insertUser();
    }
    this.userSelected = {} as User;
  }
}
