import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';
import { Producto } from '../Interfaces/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  private urlApi: string = environment.api + 'producto';

  constructor(private httpCliente: HttpClient) { }

  public listarRegistros$ = () : Observable<PaqueteApi> => 
    this.httpCliente.get<PaqueteApi>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});

  public insertarRegistros$ = (datos: Producto) : Observable<PaqueteApi> => 
    this.httpCliente.post<PaqueteApi>(this.urlApi, datos, {headers: { 'Content-Type': 'application/json' }});

  public actualizarRegistros$ = (datos: Producto) : Observable<PaqueteApi> => 
    this.httpCliente.put<PaqueteApi>(this.urlApi + '/2', datos, {headers: { 'Content-Type': 'application/json' }});

  public eliminarRegistros$ = (datos: Producto) : Observable<PaqueteApi> => 
    this.httpCliente.put<PaqueteApi>(this.urlApi + '/3', datos, {headers: { 'Content-Type': 'application/json' }});

}
