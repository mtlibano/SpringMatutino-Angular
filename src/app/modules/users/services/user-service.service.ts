import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  // public emitEvent = new EventEmitter();
  public emitUser = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  // list: User[] = [];
  private urlBase: string = 'http://localhost:8080/usuarios';
  private usersSubject = new Subject<User[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(user: User): Observable<User> {
    return this.http
      .post<User>(this.urlBase, JSON.stringify(user), this.httpOptions)
      .pipe(
        tap(() => {
          this.getUsers();
        })
      );
  }

  update(user: User): Observable<User> {
    return this.http
      .put<User>(
        `${this.urlBase}/${user.id}`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.getUsers();
        })
      );
  }

  delete(user: User): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`);
  }

  getUsers(): Observable<User[]> {
    this.http
      .get<User[]>(this.urlBase)
      .subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  getUsersByName(name: string): Observable<User[]> {
    let url = `${this.urlBase}/name-list/${name}`;
    this.http
      .get<User[]>(url)
      .subscribe((users) => this.usersSubject.next(users));
    return this.usersSubject.asObservable();
  }

  // getUsers(): Observable<User[]> {
  //   let url = `http://localhost:8080/usuarios`;
  //   return this.http.get<User[]>(url);
  // }

  // getUserName(name: string): Observable<User[]> {
  //   let url = `http://localhost:8080/usuarios/name-list/${name}`;
  //   return this.http.get<User[]>(url);
  // }

  // loadUsersByName(name: string): void {
  //   this.getUserName(name).subscribe((users: User[]) => {
  //     this.list = users;
  //   });
  //   this.emitEvent.emit(this.list);
  // }

  getUserForm(user: User): void {
    this.emitUser.emit(user);
  }
}
