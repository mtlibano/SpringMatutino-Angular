import { Component } from '@angular/core';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrls: ['./form-users.component.scss'],
})
export class FormUsersComponent {
  constructor(private service: UserServiceService) {}

  getUserName(name: string) {
    this.service.loadUsersByName(name);
  }
}
