import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Spacecraft } from '../../models/spacecraft/spacecraft.model';
import { Type } from '../../models/type/type.model';
import { Gas } from '../../models/gas/gas.model';

@Injectable({
  providedIn: 'root'
})
export class SpacecraftService {
  selectedSpacecraft: Spacecraft;
  spacecrafts: Spacecraft[];
  types: Type[];
  gases: Gas[];
  readonly baseURL = 'http://localhost:3000/spacecraft';


  constructor(private http: HttpClient) { }

  postSpacecraft(spc: Spacecraft) {
    return this.http.post(this.baseURL, spc);
  }

  getSpacecraftList() {
    return this.http.get(this.baseURL);
  }

  getFilterSpacecraft(word: string): Observable<any> {
    return this.http.post(this.baseURL + '/filter', { word });
  }

  putSpacecraft(spc: Spacecraft) {
    return this.http.put(this.baseURL + `/${spc._id}`, spc);
  }

  deleteSpacecraft(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
}
