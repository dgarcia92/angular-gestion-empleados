import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  //Obtiene el listado de todos los empleados en el Backend
  private baseUrl = `http://localhost:8080/api/v1/empleados`;

  constructor(private httpClient: HttpClient) { 
  }

  //Metodo que nos sirve para obtener los empleados
  onbtenerListaEmpleados():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseUrl}`);
  }


  //Método que nos sirve para registrar un empleado
  registrarEmpleado(empleado: Empleado) : Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}`, empleado);
  }


  //Método que nos sirve para actualizar un empleado
  actualizarEmpleado(id:number, empleado: Empleado) : Observable<Object>{
    return this.httpClient.put(`${this.baseUrl}/${id}`, empleado);
  }

  //método para obtener o buscar un empleado
  obtenerEmpleadoPorID(id:number) : Observable<Empleado>
  {
      return this.httpClient.get<Empleado>(`${this.baseUrl}/${id}`);
  }


  eliminarempleado( id: number) : Observable<Object>{
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }


}
