import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class LoopbackService {

  public url = 'http://api.teralumen.com.br/api';
  constructor(private http: HttpClient) { }

  /** Query Selected */
  getTable(table: string) {
    return this.http.get(`${this.url}/${table}`);
  }

  getActive(table: string, status= 0) {
    return this.http.get(`${this.url}/${table}?filter[where][status]=${status}`);
  }

  getFindId(table: string, id: number) {
    return this.http.get(`${this.url}/${table}?filter[where][id]=${id}`);
  }

  getFindBy(table: string, field: string, value: string) {
    return this.http.get(`${this.url}/${table}?filter[where][${field}]=${value}`);
  }

  /** Query Count */
  getCountTable(table: string) {
    return this.http.get(`${this.url}/${table}/count`);
  }

  getCountActive(table: string, status= 0) {
    return this.http.get(`${this.url}/${table}?filter[where][status]=${status}`);
  }

  getCountFindBy(table: string, field: string, value: string) {
    return this.http.get(`${this.url}/${table}/count?filter[where][${field}]=${value}`);
  }

  /** Query Execute */
  Add(table: string, data: any) {
    return this.http.post(`${this.url}/${table}`, data, 
    {headers: { 'Content-Type': 'application/json; charset=utf-8' }});
  }

  Update(table: string, id: number, data: any) {
    return this.http.put(`${this.url}/${table}/${id}`, data, 
    {headers: { 'Content-Type': 'application/json; charset=utf-8' }});
  }

  Delete(table: string, id: any) {
    return this.http.delete(`${this.url}/${table}/${id}`);
  }

}
