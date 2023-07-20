import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PilotoDto } from '../models/piloto-dto';

@Injectable({
  providedIn: 'root',
})
export class PilotoService {
  public emitPiloto = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/piloto';
  private pilotosSubject = new Subject<PilotoDto[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(piloto: PilotoDto): Observable<PilotoDto> {
    console.log(piloto);
    return this.http
      .post<PilotoDto>(this.urlBase, JSON.stringify(piloto), this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(piloto: PilotoDto): Observable<PilotoDto> {
    return this.http
      .put<PilotoDto>(
        `${this.urlBase}/${piloto.id}`,
        JSON.stringify(piloto),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  delete(piloto: PilotoDto): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${piloto.id}`);
  }

  listAll(): Observable<PilotoDto[]> {
    this.http
      .get<PilotoDto[]>(this.urlBase)
      .subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  getByName(name: string): Observable<PilotoDto[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http
      .get<PilotoDto[]>(url)
      .subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  getByEquipe(id: number): Observable<PilotoDto[]> {
    let url = `${this.urlBase}/equipe/${id}`;
    this.http
      .get<PilotoDto[]>(url)
      .subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  getByPais(id: number): Observable<PilotoDto[]> {
    let url = `${this.urlBase}/pais/${id}`;
    this.http
      .get<PilotoDto[]>(url)
      .subscribe((pilotos) => this.pilotosSubject.next(pilotos));
    return this.pilotosSubject.asObservable();
  }

  getPilotoForm(piloto: PilotoDto): void {
    this.emitPiloto.emit(piloto);
  }
}
