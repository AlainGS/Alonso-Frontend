import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private readonly urlApi: string = environment.api + 'Categoria';

  constructor(private httpCliente: HttpClient) { }

  public listarRegistros$ = () : Observable<PaqueteApi> => 
    this.httpCliente.get<PaqueteApi>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});
}