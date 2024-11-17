import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Answer } from '../models/Answer';
import { totalAnswerDTO } from '../models/totalAnswerDTO';
import { totalEncuestasDTO } from '../models/totalEncuestasDTO';

const base_url = environment.base;

@Injectable({
  providedIn: 'root',
})
export class AnswerServiceService {
  private url = `${base_url}/respuestas`;
  listacambio = new Subject<Answer[]>();

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Answer[]>(this.url);
  }

  insert(tt: Answer) {
    return this.http.post(this.url, tt);
  }

  getList() {
    return this.listacambio.asObservable();
  }

  setList(listaNueva: Answer[]) {
    this.listacambio.next(listaNueva);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listId(id: number) {
    return this.http.get<Answer>(`${this.url}/${id}`);
  }

  update(tt: Answer) {
    return this.http.patch(this.url, tt);
  }

  getTotal1(): Observable<totalAnswerDTO[]>{
    return this.http.get<totalAnswerDTO[]>(`${this.url}/totalrespuestas`)
  }

  getTotal2(): Observable<totalEncuestasDTO[]>{
    return this.http.get<totalEncuestasDTO[]>(`${this.url}/totalencuestas`)
  }

}
