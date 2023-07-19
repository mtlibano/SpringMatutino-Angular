import { EventEmitter, Injectable } from '@angular/core';
import { Pista } from '../models/pista';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PistaService {
  public emitPista = new EventEmitter();
  public updateTableEvent = new EventEmitter();
  private urlBase: string = 'http://localhost:8080/pista';
  private pistasSubject = new Subject<Pista[]>();

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  insert(pista: Pista): Observable<Pista> {
    return this.http
      .post<Pista>(this.urlBase, JSON.stringify(pista), this.httpOptions)
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  update(pista: Pista): Observable<Pista> {
    return this.http
      .put<Pista>(
        `${this.urlBase}/${pista.id}`,
        JSON.stringify(pista),
        this.httpOptions
      )
      .pipe(
        tap(() => {
          this.listAll();
        })
      );
  }

  delete(pista: Pista): Observable<void> {
    return this.http.delete<void>(`${this.urlBase}/${pista.id}`);
  }

  listAll(): Observable<Pista[]> {
    this.http
      .get<Pista[]>(this.urlBase)
      .subscribe((pistas) => this.pistasSubject.next(pistas));
    return this.pistasSubject.asObservable();
  }

  getByTamanho(tamanho: number): Observable<Pista[]> {
    let url = `${this.urlBase}/tamanho/${tamanho}/${tamanho}`;
    this.http
      .get<Pista[]>(url)
      .subscribe((pistas) => this.pistasSubject.next(pistas));
    return this.pistasSubject.asObservable();
  }

  getByPais(id: number): Observable<Pista[]> {
    let url = `${this.urlBase}/pais/${id}`;
    this.http
      .get<Pista[]>(url)
      .subscribe((pistas) => this.pistasSubject.next(pistas));
    return this.pistasSubject.asObservable();
  }

  getPistaForm(pista: Pista): void {
    this.emitPista.emit(pista);
  }
}
