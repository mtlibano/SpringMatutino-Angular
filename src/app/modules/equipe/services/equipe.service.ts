import { EventEmitter, Injectable } from '@angular/core';
import { Equipe } from '../models/equipe';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipeService {
  public emitEquipe = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/equipe';
  private equipesSubject = new Subject<Equipe[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(equipe: Equipe): Observable<Equipe> {
    return this.http
      .post<Equipe>(this.urlBase, JSON.stringify(equipe), this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(equipe: Equipe): Observable<Equipe> {
    return this.http
      .put<Equipe>(
        `${this.urlBase}/${equipe.id}`,
        JSON.stringify(equipe),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  delete(equipe: Equipe): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${equipe.id}`);
  }

  listAll(): Observable<Equipe[]> {
    this.http
      .get<Equipe[]>(this.urlBase)
      .subscribe((paises) => this.equipesSubject.next(paises));
    return this.equipesSubject.asObservable();
  }

  getByName(name: string): Observable<Equipe[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http
      .get<Equipe[]>(url)
      .subscribe((paises) => this.equipesSubject.next(paises));
    return this.equipesSubject.asObservable();
  }

  getEquipeForm(equipe: Equipe): void {
    this.emitEquipe.emit(equipe);
  }
}
