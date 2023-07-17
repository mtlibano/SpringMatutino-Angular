import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  public emitEvent = new EventEmitter();
  list: User[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    let url = `http://localhost:8080/usuarios`;
    return this.http.get<User[]>(url);
  }

  getUserName(name: string): Observable<User[]> {
    let url = `http://localhost:8080/usuarios/name-list/${name}`;
    return this.http.get<User[]>(url);
  }

  loadUsersByName(name: string): void {
    this.getUserName(name).subscribe(
      (users: User[]) => {
        this.list = users;
      },
      (error: any) => {}
    );
    this.emitEvent.emit(this.list);
  }
}
