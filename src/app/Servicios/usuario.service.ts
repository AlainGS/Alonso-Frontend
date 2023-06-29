import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaqueteApi } from '../Interfaces/paquete-api.model';
import { Login } from '../Interfaces/login.model'; 
import { Usuario } from '../Interfaces/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private urlApi: string = environment.api + 'Usuario';
  
  constructor(private httpCliente: HttpClient) { }


  
    public iniciarSesion$ = (correo: string, clave: string) : Observable<PaqueteApi> => 
      this.httpCliente.get<PaqueteApi>(`${this.urlApi}/IniciarSesion?correo=${correo}&clave=${clave}`, {headers: { 'Content-Type': 'application/json' }});
  
    public listarRegistros$ = () : Observable<PaqueteApi> => 
      this.httpCliente.get<PaqueteApi>(this.urlApi + '/Listado', {headers: { 'Content-Type': 'application/json' }});
  
    public insertarRegistros$ = (datos: Usuario) : Observable<PaqueteApi> => 
      this.httpCliente.post<PaqueteApi>(this.urlApi, datos, {headers: { 'Content-Type': 'application/json' }});

    public actualizarRegistros$ = (datos: Usuario) : Observable<PaqueteApi> => 
      this.httpCliente.put<PaqueteApi>(this.urlApi + '/2', datos, {headers: { 'Content-Type': 'application/json' }});

    public eliminarRegistros$ = (datos: Usuario) : Observable<PaqueteApi> => 
      this.httpCliente.put<PaqueteApi>(this.urlApi + '/3', datos, {headers: { 'Content-Type': 'application/json' }});
    
}
