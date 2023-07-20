import { EventEmitter, Injectable } from '@angular/core';
import { Corrida } from '../models/corrida';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  public emitCorrida = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/corrida';
  private corridasSubject = new Subject<Corrida[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(corrida: Corrida): Observable<Corrida> {
    return this.http
      .post<Corrida>(this.urlBase, JSON.stringify(corrida), this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(corrida: Corrida): Observable<Corrida> {
    return this.http
      .put<Corrida>(
        `${this.urlBase}/${corrida.id}`,
        JSON.stringify(corrida),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  delete(corrida: Corrida): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${corrida.id}`);
  }

  listAll(): Observable<Corrida[]> {
    this.http
      .get<Corrida[]>(this.urlBase)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getByData(data: string): Observable<Corrida[]> {
    let url = `${this.urlBase}/data/${data}`;
    this.http
      .get<Corrida[]>(url)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getByPista(id: number): Observable<Corrida[]> {
    let url = `${this.urlBase}/pista/${id}`;
    this.http
      .get<Corrida[]>(url)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getByCampeonato(id: number): Observable<Corrida[]> {
    let url = `${this.urlBase}/campeonato/${id}`;
    this.http
      .get<Corrida[]>(url)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getCorridaForm(corrida: Corrida): void {
    this.emitCorrida.emit(corrida);
  }
}
