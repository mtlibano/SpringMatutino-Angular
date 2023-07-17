import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './components/users/users.component';
import { TableUsersComponent } from './components/table-users/table-users.component';
import { FormUsersComponent } from './components/form-users/form-users.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsersComponent, TableUsersComponent, FormUsersComponent],
  imports: [CommonModule, FormsModule],
  exports: [UsersComponent],
})
export class UsersModule {}
