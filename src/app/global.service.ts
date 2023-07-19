import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  public token: string = 'Bearer ';

  constructor(private http: HttpClient) {}

  public getToken(email: string, password: string) {
    let httpOptions = 
  }
}
