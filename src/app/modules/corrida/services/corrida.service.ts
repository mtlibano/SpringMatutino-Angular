import { EventEmitter, Injectable } from '@angular/core';
import { Corrida } from '../models/corrida';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CorridaDto } from '../models/corrida-dto';

@Injectable({
  providedIn: 'root',
})
export class CorridaService {
  public emitCorrida = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/corrida';
  private corridasSubject = new Subject<CorridaDto[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(corrida: CorridaDto): Observable<CorridaDto> {
    return this.http
      .post<CorridaDto>(this.urlBase, JSON.stringify(corrida), this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(corrida: CorridaDto): Observable<CorridaDto> {
    return this.http
      .put<CorridaDto>(
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

  delete(corrida: CorridaDto): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${corrida.id}`);
  }

  listAll(): Observable<CorridaDto[]> {
    this.http
      .get<CorridaDto[]>(this.urlBase)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getByData(data: string): Observable<CorridaDto[]> {
    let url = `${this.urlBase}/data/${data}`;
    this.http
      .get<CorridaDto[]>(url)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getByPista(id: number): Observable<CorridaDto[]> {
    let url = `${this.urlBase}/pista/${id}`;
    this.http
      .get<CorridaDto[]>(url)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getByCampeonato(id: number): Observable<CorridaDto[]> {
    let url = `${this.urlBase}/campeonato/${id}`;
    this.http
      .get<CorridaDto[]>(url)
      .subscribe((corridas) => this.corridasSubject.next(corridas));
    return this.corridasSubject.asObservable();
  }

  getCorridaForm(corrida: CorridaDto): void {
    this.emitCorrida.emit(corrida);
  }
}
