import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlApi: string = environment.api + 'Menu';

  constructor(private httpCliente: HttpClient) { }

  listaMenu$ = (idUsuario: Number) : Observable<PaqueteApi> => 
    this.httpCliente.get<PaqueteApi>(`${this.urlApi}/ListaMenu?idUsuario=${idUsuario}`, {headers: { 'Content-Type': 'application/json' }});
}