import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApiModel } from '../Modelos/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private urlApi: string = environment.api + 'Menu';

  constructor(private httpCliente: HttpClient) { }

  listaMenu(idUsuario: number): Observable<PaqueteApiModel> {
    return this.httpCliente.delete<PaqueteApiModel>(`${this.urlApi}/Lista?idUsuario=${idUsuario}`)
  }
}