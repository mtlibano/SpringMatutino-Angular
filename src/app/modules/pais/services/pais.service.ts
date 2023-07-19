import { EventEmitter, Injectable } from '@angular/core';
import { Pais } from '../models/pais';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PaisService {
  public emitPais = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/pais';
  private paisesSubject = new Subject<Pais[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(pais: Pais): Observable<Pais> {
    return this.http
      .post<Pais>(this.urlBase, JSON.stringify(pais), this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(pais: Pais): Observable<Pais> {
    return this.http
      .put<Pais>(
        `${this.urlBase}/${pais.id}`,
        JSON.stringify(pais),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  delete(pais: Pais): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${pais.id}`);
  }

  listAll(): Observable<Pais[]> {
    this.http
      .get<Pais[]>(this.urlBase)
      .subscribe((paises) => this.paisesSubject.next(paises));
    return this.paisesSubject.asObservable();
  }

  getByName(name: string): Observable<Pais[]> {
    let url = `${this.urlBase}/name/${name}`;
    this.http
      .get<Pais[]>(url)
      .subscribe((paises) => this.paisesSubject.next(paises));
    return this.paisesSubject.asObservable();
  }

  getPaisForm(pais: Pais): void {
    this.emitPais.emit(pais);
  }
}
