import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApiModel } from '../Modelos/paquete-api.model';
import { environment } from 'src/environments/environment';
import { VentaModel } from '../Modelos/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private urlApi: string = environment.api + 'Venta';
  
  constructor(private httpCliente: HttpClient) { }

  listarRegistros$ = () : Observable<PaqueteApiModel> => 
    this.httpCliente.post<PaqueteApiModel>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});

  insertarRegistros$ = (datos: VentaModel) : Observable<PaqueteApiModel> => 
    this.httpCliente.post<PaqueteApiModel>(this.urlApi, datos, {headers: { 'Content-Type': 'application/json' }});

  actualizarRegistros$ = (datos: VentaModel) : Observable<PaqueteApiModel> => 
    this.httpCliente.put<PaqueteApiModel>(this.urlApi + '/2', datos, {headers: { 'Content-Type': 'application/json' }});

  eliminarRegistros$ = (datos: VentaModel) : Observable<PaqueteApiModel> => 
    this.httpCliente.put<PaqueteApiModel>(this.urlApi + '/3', datos, {headers: { 'Content-Type': 'application/json' }});

  registrar(request: VentaModel): Observable<PaqueteApiModel> {
    return this.httpCliente.post<PaqueteApiModel>(`${this.urlApi}/Registrar`, request)
  }
  
  historial(buscarPor:string, numeroVenta:string, fechaInicio:string, fechaFin:string) : Observable<PaqueteApiModel> {
    return this.httpCliente.get<PaqueteApiModel>(`${this.urlApi}Historial?buscarPor=${buscarPor}&numeroVenta=${numeroVenta}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }

  reporte(fechaInicio: string, fechaFin: string): Observable<PaqueteApiModel> {
    return this.httpCliente.get<PaqueteApiModel>(`${this.urlApi}Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);
  }
}
