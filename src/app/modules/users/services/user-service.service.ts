import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  public emitUser = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/usuarios';
  private usersSubject = new Subject<User[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private httpOptions2 = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    responseType: 'text' as 'json',
  };

  constructor(private http: HttpClient) {}

  insert(user: User): Observable<User> {
    return this.http
      .post<User>(this.urlBase, JSON.stringify(user), this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
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
          this.listAll();
        })
      );
  }

  delete(user: User): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${user.id}`);
  }

  listAll(): Observable<User[]> {
    let httpOptions3 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .get<User[]>(this.urlBase, httpOptions3)
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

  getUserForm(user: User): void {
    this.emitUser.emit(user);
  }
}
