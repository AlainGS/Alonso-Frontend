import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApiModel } from '../Modelos/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private urlApi: string = environment.api + 'DashBoard';

  constructor(private httpCliente: HttpClient) { }

  resumen(): Observable<PaqueteApiModel> {
    return this.httpCliente.get<PaqueteApiModel>(`${this.urlApi}/Resumen`)
  }
}
