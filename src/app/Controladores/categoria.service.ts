import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApiModel } from '../Modelos/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly urlApi: string = environment.api + 'Categoria';

  constructor(private httpCliente: HttpClient) { }

  public listarRegistros$ = () : Observable<PaqueteApiModel> => 
    this.httpCliente.post<PaqueteApiModel>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});
}