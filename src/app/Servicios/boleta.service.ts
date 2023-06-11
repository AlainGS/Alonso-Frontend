import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BoletaService {
  private urlApi: string = environment.api + 'Boleta';

  constructor(private httpCliente: HttpClient) { }

  public ultimoNumero$ = () : Observable<any> => 
    this.httpCliente.post(this.urlApi + '/UltimoNumero', {headers: { 'Content-Type': 'application/json' }});
}
