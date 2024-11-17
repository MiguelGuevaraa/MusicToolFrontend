import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Suscription } from '../models/Suscription';
import { totalMetodoPagoAnsDTO } from '../models/totalMetodoPagoAnsDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SuscriptionService {
  private url = `${base_url}/suscripciones`;
  listacambio = new Subject<Suscription[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Suscription[]>(this.url);
  }

  insert(sus: Suscription) {
    return this.http.post(this.url, sus);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Suscription[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  listId(id: number) {
    return this.http.get<Suscription>(`${this.url}/${id}`);
  }

  update(sus: Suscription) {
    return this.http.patch(this.url, sus);
  }
}
