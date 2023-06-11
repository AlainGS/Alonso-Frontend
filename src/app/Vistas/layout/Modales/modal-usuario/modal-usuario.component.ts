import { Component, Inject, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rol } from '../../../../Interfaces/rol.model';
import { Usuario } from '../../../../Interfaces/usuario.model';

import { RolService } from '../../../../Servicios/rol.service';
import { UsuarioService } from '../../../../Servicios/usuario.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrls: ['./modal-usuario.component.scss']
})
export class ModalUsuarioComponent implements OnInit, AfterViewInit {
  formUsuario: FormGroup;
  ocultarPassword: boolean = true;
  tituloAccion:string ="Agregar"
  botonAccion: string = "Guardar";
  listaRoles: Rol[] = [];
  mostrarLoading : boolean = false;

  registro : Usuario;

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: any,
    private fb: FormBuilder,
    private _rolServicio: RolService,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  )
  {
    this.crearModal();
  }
  
  ngOnInit(): void {
    this.registro = this.datosUsuario.editarRegistro ? this.datosUsuario.editarRegistro : null;
    this.cargarDatosModal();
  }

  crearModal(){
    this.formUsuario = this.fb.group({
      usuarioNombreF  : ['', Validators.required],
      rolIDF          : ['', Validators.required],
      usuarioCorreoF  : ['', Validators.required],
      usuarioClaveF   : ['', Validators.required],
      usuarioEstadoF  : [1 , Validators.required]
    })

    if (this.registro) {
      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }
    
    this.listarComboRol();
  }

  cargarDatosModal(){
    this.mostrarLoading = true;
    if (this.registro) {
      this.formUsuario.patchValue({
        usuarioNombreF  : this.registro.usuarioNombre,
        rolIDF          : this.registro.rolID,
        usuarioCorreoF  : this.registro.usuarioCorreo,
        usuarioClaveF   : this.registro.usuarioClave,
        usuarioEstadoF  : this.registro.usuarioEstado
      })
    }
    this.mostrarLoading = false;
  }

  ngAfterViewInit() { }

  guardarEditar_Usuario() {
    this.mostrarLoading = true;
    
    //PREPARAR USUARIO MODAL
    const registroDatos: Usuario = {
      usuarioID     : this.registro == null ? 0 : this.registro.usuarioID,
      usuarioNombre : this.formUsuario.value.usuarioNombreF,
      rolID         : this.formUsuario.value.rolIDF,      
      usuarioCorreo : this.formUsuario.value.usuarioCorreoF,
      usuarioClave  : this.formUsuario.value.usuarioClaveF,
      usuarioEstado : parseInt(this.formUsuario.value.usuarioEstadoF)
    }

    //ACTUALIZAR USUARIO
    if (this.registro) {
      
      this._usuarioServicio.actualizarRegistros$(registroDatos).subscribe({
        next: (data) => {

          if (data.estadoData) {
            this._utilidadServicio.mostrarAlerta("El usuario fue editado", "Exito");
            this.modalActual.close('true')
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo editar el usuario", "Error");
          }
        },
        error: () => {
          this.mostrarLoading = false;
        },
        complete: () => {
          this.mostrarLoading = false;
        }
      })

    } //INSERTAR USUARIO
      else {
      
      this._usuarioServicio.insertarRegistros$(registroDatos).subscribe({
        next: (data) => {

          if (data.estadoData) {
            this._utilidadServicio.mostrarAlerta("El usuario fue registrado", "Exito")
            this.modalActual.close("true")
          } else {
            this._utilidadServicio.mostrarAlerta("No se pudo registrar el usuario", "Error")
          }
        },
        error: () => {
          this.mostrarLoading = false;
        },
        complete: () => {
          this.mostrarLoading = false;
        }
      })
    }
    this.mostrarLoading = false;
  }

  listarComboRol(){
    this.mostrarLoading = true;
    this._rolServicio.listarRegistros$({}).subscribe({
      next: (data) => {
        if (data.estadoData) {
          this.listaRoles = data.cuerpoData;
          if (this.registro){
            this.formUsuario.patchValue({
              rolID: this.registro.rolID
            });
            this._utilidadServicio.mostrarAlerta("Combo Roles", 'LISTO!');
          }
        }
      },
      error: () => {
        this._utilidadServicio.mostrarAlerta("Error Combo Roles", 'Oops!');
        this.mostrarLoading = false;
      },
      complete: () => {
        this.mostrarLoading = false;
      }
    })
  }

}
