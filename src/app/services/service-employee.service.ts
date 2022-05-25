import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/Employee';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ServiceEmployeeService {

  serverUrl = environment.apiBaseUrl;

  constructor(private http : HttpClient) { }

  getEmployees() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.serverUrl + '/all');
  }

  getEmployeeById(id: number) : Observable<Employee>{
    return this.http.get<Employee>(this.serverUrl + '/find/' + id );
  }

  addEmployee(emp: Employee) : Observable<Employee>{
    console.log("entro al service del add")
    return this.http.post<Employee>(this.serverUrl + '/add/' , emp );
  }

  
  updateEmployee(emp: Employee) : Observable<Employee>{
    return this.http.put<Employee>(this.serverUrl + '/update/' , emp );
  }

  deleteEmployeeById(id: number) : Observable<void>{
    return this.http.delete<void>(this.serverUrl + '/delete/' + id );
  }


}
