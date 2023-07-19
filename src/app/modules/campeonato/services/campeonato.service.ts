import { EventEmitter, Injectable } from '@angular/core';
import { Campeonato } from '../models/campeonato';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CampeonatoService {
  public emitCampeonato = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/campeonato';
  private campeonatosSubject = new Subject<Campeonato[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(campeonato: Campeonato): Observable<Campeonato> {
    return this.http
      .post<Campeonato>(
        this.urlBase,
        JSON.stringify(campeonato),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(campeonato: Campeonato): Observable<Campeonato> {
    return this.http
      .put<Campeonato>(
        `${this.urlBase}/${campeonato.id}`,
        JSON.stringify(campeonato),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  delete(campeonato: Campeonato): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${campeonato.id}`);
  }

  listAll(): Observable<Campeonato[]> {
    this.http
      .get<Campeonato[]>(this.urlBase)
      .subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  getByDescription(descricao: string): Observable<Campeonato[]> {
    let url = `${this.urlBase}/descricao/${descricao}`;
    this.http
      .get<Campeonato[]>(url)
      .subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  getByAno(ano: number): Observable<Campeonato[]> {
    let url = `${this.urlBase}/ano/${ano}`;
    this.http
      .get<Campeonato[]>(url)
      .subscribe((campeonatos) => this.campeonatosSubject.next(campeonatos));
    return this.campeonatosSubject.asObservable();
  }

  getCampeonatoForm(campeonato: Campeonato): void {
    this.emitCampeonato.emit(campeonato);
  }
}
