import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Survey } from '../models/Survey';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class SurveyServiceService {
  private url = `${base_url}/encuestas`;
  listacambio = new Subject<Survey[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Survey[]>(this.url);
  }

  insert(sry: Survey) {
    return this.http.post(this.url, sry);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Survey[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  listId(id: number) {
    return this.http.get<Survey>(`${this.url}/${id}`);
  }

  update(sry: Survey) {
    return this.http.patch(this.url, sry);
  }
}
