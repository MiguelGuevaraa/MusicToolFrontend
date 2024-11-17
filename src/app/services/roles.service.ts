import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Roles } from '../models/Roles';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/roles`;
  listacambio = new Subject<Roles[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Roles[]>(this.url);
  }

  insert(tt: Roles) {
    return this.http.post(this.url, tt);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Roles[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Roles>(`${this.url}/${id}`);
  }

  update(tt: Roles) {
    return this.http.put(this.url, tt);
  }
}
