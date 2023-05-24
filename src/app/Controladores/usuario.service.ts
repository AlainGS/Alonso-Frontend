import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaqueteApiModel } from '../Modelos/paquete-api.model';
import { LoginModel } from '../Modelos/login.model'; 
import { UsuarioModel } from '../Modelos/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi: string = environment.api + 'Usuario';
  
  constructor(private httpCliente: HttpClient) { }


  
    public iniciarSesion$ = (correo: string, clave: string) : Observable<PaqueteApiModel> => 
      this.httpCliente.get<PaqueteApiModel>(`${this.urlApi}/IniciarSesion?correo=${correo}&clave=${clave}`, {headers: { 'Content-Type': 'application/json' }});
  
    public listarRegistros$ = (datos: any) : Observable<PaqueteApiModel> => 
      this.httpCliente.post<PaqueteApiModel>(this.urlApi + '/Listado', datos, {headers: { 'Content-Type': 'application/json' }});
  
    public insertarRegistros$ = (datos: UsuarioModel) : Observable<PaqueteApiModel> => 
      this.httpCliente.post<PaqueteApiModel>(this.urlApi, datos, {headers: { 'Content-Type': 'application/json' }});

    public actualizarRegistros$ = (datos: UsuarioModel) : Observable<PaqueteApiModel> => 
      this.httpCliente.put<PaqueteApiModel>(this.urlApi + '/2', datos, {headers: { 'Content-Type': 'application/json' }});

    public eliminarRegistros$ = (datos: UsuarioModel) : Observable<PaqueteApiModel> => 
      this.httpCliente.put<PaqueteApiModel>(this.urlApi + '/3', datos, {headers: { 'Content-Type': 'application/json' }});
    
}
