import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApiModel } from '../Modelos/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NumeroDocumentoService {
  private urlApi: string = environment.api + 'NumeroDocumento';

  constructor(private httpCliente: HttpClient) { }

  public ultimoNumero$ = () : Observable<any> => 
    this.httpCliente.post(this.urlApi + '/UltimoNumero', {headers: { 'Content-Type': 'application/json' }});
}
