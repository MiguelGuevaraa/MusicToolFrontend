import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Mensaje } from '../models/Mensaje';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  private url = `${base_url}/mensajes`;
  listacambio = new Subject<Mensaje[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Mensaje[]>(this.url);
  }

  insert(msj: Mensaje) {
    return this.http.post(this.url, msj);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Mensaje[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  listId(id: number) {
    return this.http.get<Mensaje>(`${this.url}/${id}`);
  }

  update(msj: Mensaje) {
    return this.http.put(this.url, msj);
  }
}
