import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { SesionModel } from '../Modelos/sesion.model';

@Injectable({
    providedIn: 'root'
})

export class UtilidadService{
    constructor(private _snackBar: MatSnackBar){}

    mostrarAlerta(mensaje: string, tipo: string ){
        this._snackBar.open(mensaje, tipo, {
            horizontalPosition: "center",
            verticalPosition: "bottom",
            duration: 4000
        })
    }

    guardarSesionUsuario(usuarioSession: SesionModel){
        localStorage.setItem("usuario", JSON.stringify(usuarioSession));
    }

    obtenerSesionUsuario(){
        const dataCadena = localStorage.getItem("usuario");
        const usuario = JSON.parse(dataCadena!);
        return usuario;
    }

    eliminarSesionUsuario(){
        localStorage.removeItem("usuario");
    }
}