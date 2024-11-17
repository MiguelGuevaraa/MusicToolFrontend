import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Publics } from '../models/Publics';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class PublicsService {
  private url = `${base_url}/publicaciones`;
  listacambio = new Subject<Publics[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Publics[]>(this.url);
  }

  insert(pub: Publics) {
    return this.http.post(this.url, pub);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Publics[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  listId(id: number) {
    return this.http.get<Publics>(`${this.url}/${id}`);
  }

  update(pub: Publics) {
    return this.http.patch(this.url, pub);
  }
}
