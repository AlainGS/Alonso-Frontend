import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DashboardService {
  private urlApi: string = environment.api + 'DashBoard';

  constructor(private httpCliente: HttpClient) { }

  resumen$(): Observable<PaqueteApi> {
    return this.httpCliente.get<PaqueteApi>(`${this.urlApi}/Resumen`)
  }

  graficoBarras$(): Observable<PaqueteApi> {
    return this.httpCliente.get<PaqueteApi>(`${this.urlApi}/GraficoBarras`)
  }
}
