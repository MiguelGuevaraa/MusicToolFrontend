import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { PreRelease_Songs } from '../models/PreRelease_Songs';
import { ContarSongsDTO } from '../models/ContarSongsDTO';
import { totalSongsDTO } from '../models/totalSongsDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PrereleaseSongsService {
  private url = `${base_url}/precanciones`;
  listacambio = new Subject<PreRelease_Songs[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<PreRelease_Songs[]>(this.url);
  }

  insert(prs: PreRelease_Songs) {
    return this.http.post(this.url, prs);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: PreRelease_Songs[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  listId(id: number) {
    return this.http.get<PreRelease_Songs>(`${this.url}/${id}`);
  }

  update(prs: PreRelease_Songs) {
    return this.http.patch(this.url, prs);
  }

  getCantidad(): Observable<ContarSongsDTO[]>{
    return this.http.get<ContarSongsDTO[]>(`${this.url}/totalcancionesgenero`)
  }

  getTotal(): Observable<totalSongsDTO[]>{
    return this.http.get<totalSongsDTO[]>(`${this.url}/totalcanciones`)
  }
}
