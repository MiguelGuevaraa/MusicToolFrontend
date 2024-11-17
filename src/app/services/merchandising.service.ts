import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Merchandising } from '../models/Merchandising';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class MerchandisingService {
  private url = `${base_url}/Merchandising`;
  listaCambio = new Subject<Merchandising[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Merchandising[]>(this.url);
  }

  insert(m: Merchandising) {
    return this.http.post(this.url, m);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Merchandising[]) {
    this.listaCambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  
  listId(id: number) {
    return this.http.get<Merchandising>(`${this.url}/${id}`);
  }

  update(m: Merchandising) {
    return this.http.patch(this.url, m);
  }
}
