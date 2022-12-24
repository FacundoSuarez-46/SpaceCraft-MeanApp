import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Type } from '../../models/type/type.model';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  selectedType: Type;
  types: Type[];
  readonly baseURL = 'http://localhost:3000/type';


  constructor(private http: HttpClient) { }

  postType(typ: Type) {
    return this.http.post(this.baseURL, typ);
  }

  getTypeList() {
    return this.http.get(this.baseURL);
  }

  putType(typ: Type) {
    return this.http.put(this.baseURL + `/${typ._id}`, typ);
  }

  deleteType(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
