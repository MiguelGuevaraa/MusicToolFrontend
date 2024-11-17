import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Pagos } from '../models/Pagos';
import { totalMetodoPagoAnsDTO } from '../models/totalMetodoPagoAnsDTO';
import { totalTipoSubsAnswDTO } from '../models/totalTipoSubsAnswDTO';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class PagosService {
  private url = `${base_url}/pagos`;
  listacambio = new Subject<Pagos[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Pagos[]>(this.url);
  }

  insert(pag: Pagos) {
    return this.http.post(this.url, pag);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Pagos[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  listId(id: number) {
    return this.http.get<Pagos>(`${this.url}/${id}`);
  }

  update(pag: Pagos) {
    return this.http.put(this.url, pag);
  }
  
  getCantidad1(): Observable<totalMetodoPagoAnsDTO[]>{
    return this.http.get<totalMetodoPagoAnsDTO[]>(`${this.url}/totalmetodopago`)
  }
  getCantidad2(): Observable<totalTipoSubsAnswDTO[]>{
    return this.http.get<totalTipoSubsAnswDTO[]>(`${this.url}/totaltiposubs`)
  }
}
