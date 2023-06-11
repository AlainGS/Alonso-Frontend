import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';
import { DetalleVenta } from '../Interfaces/detalle-venta.model';

@Injectable({
  providedIn: 'root'
})
export class DetalleVentaService {
  private urlApi: string = environment.api + 'DetalleVenta';
  
  constructor(private httpCliente: HttpClient) { }

  listarDetalleVentaPorID$ = (id: Number) : Observable<PaqueteApi> => 
    this.httpCliente.get<PaqueteApi>(`${this.urlApi}/BuscarDetalleVenta?id=${id}`, {headers: { 'Content-Type': 'application/json' }});
  
}
