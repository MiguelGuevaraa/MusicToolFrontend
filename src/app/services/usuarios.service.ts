import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { Users } from '../models/Users';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url = `${base_url}/usuarios`;
  listacambio = new Subject<Users[]>();

  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Users[]>(this.url);
  }

  insert(tt: Users) {
    return this.http.post(this.url, tt);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Users[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Users>(`${this.url}/${id}`);
  }

  update(tt: Users) {
    return this.http.put(this.url, tt);
  }
}
