import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

import { ModalDetalleVentaComponent } from '../../Modales/modal-detalle-venta/modal-detalle-venta.component';

import { Venta } from '../../../../Interfaces/venta.model';
import { VentaService } from '../../../../Servicios/venta.service';
import { DetalleVentaService } from '../../../../Servicios/detalleventa.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';
import { DetalleVenta } from 'src/app/Interfaces/detalle-venta.model';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-historial_venta',
  templateUrl: './historialventa.component.html',
  styleUrls: ['./historialventa.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class HistorialVentaComponent implements OnInit {
  formBusqueda: FormGroup;

  opcionesBusqueda: any[] = [
    { value: "fecha", descripcion: "Por Fechas" },
    { value: "numero", descripcion: "Número Venta" }
  ]
  
  displayedColumns: string[] = [
    'fechaRegistro', 
    'numeroBoleta', 
    'tipoPago', 
    'ventaTotal', 
    'accion'
  ];
  
  datosInicio: Venta[] = [];
  datosListaVenta = new MatTableDataSource(this.datosInicio);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;
  
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _ventaServicio: VentaService,
    private _detalleVentaServicio: DetalleVentaService,
    private _utilidadServicio: UtilidadService
  ) {
    this.crearFormBusqueda();
  }

  ngOnInit(): void {
    this.cargarListadoVentas();
  }

  crearFormBusqueda(){
    this.formBusqueda = this.fb.group({
      buscarPorF    : ['fecha'],
      numeroBoletaF : [''],
      fechaInicioF  : [''],
      fechaFinF     : ['']
    })

    this.formBusqueda.get('buscarPorF')?.valueChanges.subscribe(value => {
      this.formBusqueda.patchValue({
        numeroBoletaF : "",
        fechaInicioF  : "",
        fechaFinF     : ""
      })
    })
  }

  ngAfterViewInit() {
    this.datosListaVenta.paginator = this.paginacionTabla;
  }

  aplicarFiltroTabla(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datosListaVenta.filter = filterValue.trim().toLowerCase();
  }

  buscarVentas() {

    let _fechaInicio: string = "";
    let _fechaFin: string =  "";
    
    if(this.formBusqueda.value.buscarPor === "fecha"){
      _fechaInicio = moment(this.formBusqueda.value.fechaInicio).format('DD/MM/YYYY');
      _fechaFin = moment(this.formBusqueda.value.fechaFin).format('DD/MM/YYYY');
      
      if (_fechaInicio === "Invalid date" || _fechaFin === "Invalid date") {
        this._utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas", 'Oops!');
        return;
      }
    }

    this._ventaServicio.historialVentas$(
      this.formBusqueda.value.buscarPor,
      this.formBusqueda.value.numero,
      _fechaInicio,
      _fechaFin,
    ).subscribe({
      next: (data) => {
        if (data.estadoData) {
          this.datosListaVenta.data = data.cuerpoData;
        }
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", 'Oops!');
      },
      error: (e) => {
      },
      complete: () => {
      }
    })

  }

  verDetalleVenta(_venta: Venta) {
    this._detalleVentaServicio.listarDetalleVentaPorID$(_venta.ventaID!).subscribe({
      next: (data) => {
        if (data.estadoData){
          _venta.detalleVenta = data.cuerpoData;
          this.dialog.open(ModalDetalleVentaComponent, {
            data: _venta,
            disableClose: true,
            width: '900px',
          })
          this._utilidadServicio.mostrarAlerta("DetalleVentas Encontradas", 'EXITO! 📝');
        }
        else
          this._utilidadServicio.mostrarAlerta("No hay DetalleVentas Registradas", 'Oops 😢!');
      },
      error: (e) => {
        this._utilidadServicio.mostrarAlerta("Error Lista DetalleVentas", 'Oops!');
      },
      complete: () => {
      }
    });   
  }

  cargarListadoVentas() {
    this._ventaServicio.listarRegistros$().subscribe({
      next: (data) => {
        if (data.estadoData){
          this.datosListaVenta.data = data.cuerpoData;
          this._utilidadServicio.mostrarAlerta("Ventas Encontradas", 'EXITO! 💳');
        }
        else
          this._utilidadServicio.mostrarAlerta("No hay Ventas Registradas", 'Oops 😢!');
      },
      error: (e) => {
        this._utilidadServicio.mostrarAlerta("Error Lista Ventas", 'Oops!');
      },
      complete: () => {
      }
    })
  }  
}
