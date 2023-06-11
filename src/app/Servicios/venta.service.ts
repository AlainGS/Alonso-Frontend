import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';
import { Venta } from '../Interfaces/venta.model';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private urlApi: string = environment.api + 'Venta';
  
  constructor(private httpCliente: HttpClient) { }

  listarRegistros$ = () : Observable<PaqueteApi> => 
    this.httpCliente.post<PaqueteApi>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});

  listarRegistrosDetallados$ = () : Observable<PaqueteApi> => 
    this.httpCliente.post<PaqueteApi>(this.urlApi + '/ListadoDetallado', {headers: { 'Content-Type': 'application/json' }});

  insertarRegistros$ = (datos: Venta) : Observable<PaqueteApi> => 
    this.httpCliente.post<PaqueteApi>(this.urlApi, datos, {headers: { 'Content-Type': 'application/json' }});
  
  historialVentas$ = (buscarPor:string, numeroVenta:string, fechaInicio:string, fechaFin:string) : Observable<PaqueteApi> =>
    this.httpCliente.get<PaqueteApi>(`${this.urlApi}Reporte?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

  reporteVentas$ = (fechaInicio:string, fechaFin:string) : Observable<PaqueteApi> => 
    this.httpCliente.get<PaqueteApi>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});
   
}
