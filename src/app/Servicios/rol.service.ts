import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private urlApi: string = environment.api + 'Rol';

  constructor(private httpCliente: HttpClient) { }

  public listarRegistros$ = () : Observable<any> => 
    this.httpCliente.get(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});
}
