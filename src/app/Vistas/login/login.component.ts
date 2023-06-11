import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/Interfaces/login.model';
import { UsuarioService } from '../../Servicios/usuario.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  ocultarPassword : boolean = true;
  mostrarLoading  : boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formLogin = this.fb.group({
      emailControl: ['', Validators.required],
      passwordControl: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }


  
  iniciarSesion() {
    this.mostrarLoading = true;

    const logearse : Login = {
      correo : this.formLogin.value.emailControl,
      clave : this.formLogin.value.passwordControl
    }

    this._usuarioServicio.iniciarSesion$(logearse.correo, logearse.clave).subscribe({
      next: (data) => {
        if (data.cuerpoData.usuarioID > 0) {
          this._utilidadServicio.guardarSesionUsuario(data.cuerpoData);
          this.router.navigate(['pages/dashboard']);
          this._utilidadServicio.mostrarAlerta(""+data.cuerpoData.usuarioNombre, 'BIENVENIDO!');
        } else {
          this._utilidadServicio.mostrarAlerta("No se encontraron coincidencias", 'Oops!');
          this.router.navigate(['login']);
        }
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => {
        this._utilidadServicio.mostrarAlerta("Hubo un error", 'Oops!');
        this.mostrarLoading = false;
      },
    })
  }
}
