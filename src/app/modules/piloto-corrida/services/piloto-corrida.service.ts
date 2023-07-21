import { EventEmitter, Injectable } from '@angular/core';
import { PilotoCorridaDto } from '../models/piloto-corrida-dto';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PilotoCorridaService {
  public emitPilotoCorrida = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/piloto-corrida';
  private pilotoCorridasSubject = new Subject<PilotoCorridaDto[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(pilotoCorrida: PilotoCorridaDto): Observable<PilotoCorridaDto> {
    console.log(pilotoCorrida);
    return this.http
      .post<PilotoCorridaDto>(
        this.urlBase,
        JSON.stringify(pilotoCorrida),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(pilotoCorrida: PilotoCorridaDto): Observable<PilotoCorridaDto> {
    return this.http
      .put<PilotoCorridaDto>(
        `${this.urlBase}/${pilotoCorrida.id}`,
        JSON.stringify(pilotoCorrida),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  delete(pilotoCorrida: PilotoCorridaDto): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${pilotoCorrida.id}`);
  }

  listAll(): Observable<PilotoCorridaDto[]> {
    this.http
      .get<PilotoCorridaDto[]>(this.urlBase)
      .subscribe((pilotoCorridas) =>
        this.pilotoCorridasSubject.next(pilotoCorridas)
      );
    return this.pilotoCorridasSubject.asObservable();
  }

  getByColocacao(colocacao: number): Observable<PilotoCorridaDto[]> {
    let url = `${this.urlBase}/colocacao/${colocacao}`;
    this.http
      .get<PilotoCorridaDto[]>(url)
      .subscribe((pilotos) => this.pilotoCorridasSubject.next(pilotos));
    return this.pilotoCorridasSubject.asObservable();
  }

  getByPiloto(id: number): Observable<PilotoCorridaDto[]> {
    let url = `${this.urlBase}/piloto/${id}`;
    this.http
      .get<PilotoCorridaDto[]>(url)
      .subscribe((pilotos) => this.pilotoCorridasSubject.next(pilotos));
    return this.pilotoCorridasSubject.asObservable();
  }

  getByCorrida(id: number): Observable<PilotoCorridaDto[]> {
    let url = `${this.urlBase}/corrida/${id}`;
    this.http
      .get<PilotoCorridaDto[]>(url)
      .subscribe((pilotos) => this.pilotoCorridasSubject.next(pilotos));
    return this.pilotoCorridasSubject.asObservable();
  }

  getPilotoCorridaForm(pilotoCorrida: PilotoCorridaDto): void {
    this.emitPilotoCorrida.emit(pilotoCorrida);
  }
}
