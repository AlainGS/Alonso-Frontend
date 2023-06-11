import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Sesion } from '../Interfaces/sesion.model';

@Injectable({
    providedIn: 'root'
})

export class UtilidadService{
    constructor(
        private _snackBar: MatSnackBar
    ){}

    mostrarAlerta(mensaje: string, tipo: string ){
        this._snackBar.open(mensaje, tipo, {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 4000
        })
    }

    guardarSesionUsuario(usuarioSession: Sesion){
        localStorage.setItem("usuarioLS", JSON.stringify(usuarioSession));
    }

    obtenerSesionUsuario(){
        const dataCadena = localStorage.getItem("usuarioLS");
        const usuario = JSON.parse(dataCadena!);
        return usuario;
    }

    eliminarSesionUsuario(){
        localStorage.removeItem("usuarioLS");
    }
}