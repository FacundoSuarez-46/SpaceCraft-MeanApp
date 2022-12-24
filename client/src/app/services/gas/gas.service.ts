import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Gas } from '../../models/gas/gas.model';


@Injectable({
  providedIn: 'root'
})
export class GasService {
  selectedGas: Gas;
  gases: Gas[];
  readonly baseURL = 'http://localhost:3000/gas';


  constructor(private http: HttpClient) { }

  postGas(gas: Gas) {
    return this.http.post(this.baseURL, gas);
  }

  getGasList() {
    return this.http.get(this.baseURL);
  }

  putGas(gas: Gas) {
    return this.http.put(this.baseURL + `/${gas._id}`, gas);
  }

  deleteGas(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

}
