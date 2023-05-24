import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApiModel } from '../Modelos/paquete-api.model';
import { environment } from 'src/environments/environment';
import { ProductoModel } from '../Modelos/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  private urlApi: string = environment.api + 'producto';

  constructor(private httpCliente: HttpClient) { }

  public listarRegistros$ = () : Observable<PaqueteApiModel> => 
    this.httpCliente.post<PaqueteApiModel>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});

  public insertarRegistros$ = (datos: ProductoModel) : Observable<PaqueteApiModel> => 
    this.httpCliente.post<PaqueteApiModel>(this.urlApi, datos, {headers: { 'Content-Type': 'application/json' }});

  public actualizarRegistros$ = (datos: ProductoModel) : Observable<PaqueteApiModel> => 
    this.httpCliente.put<PaqueteApiModel>(this.urlApi + '/2', datos, {headers: { 'Content-Type': 'application/json' }});

  public eliminarRegistros$ = (datos: ProductoModel) : Observable<PaqueteApiModel> => 
    this.httpCliente.put<PaqueteApiModel>(this.urlApi + '/3', datos, {headers: { 'Content-Type': 'application/json' }});

}
