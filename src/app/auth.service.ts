import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'Employee/';

  constructor(private http: HttpClient, private router: Router, private _location: Location) {}

  SaveOrEditEmployee(model: any) {
    return this.http.post(this.baseUrl + 'SaveOrEditEmployee', model);
  }

  DeleteEmployee(id:any) {
    return this.http.get<any>(this.baseUrl + 'DeleteEmployee?id='+id);
  }
  GetEmployee(id:any) {
    return this.http.get<any>(this.baseUrl + 'GetEmployee?id='+id);
  }
  GetAllEmployee():Observable<any> {
    return this.http.get<any>(this.baseUrl + 'GetAllEmployee');
  }

}
