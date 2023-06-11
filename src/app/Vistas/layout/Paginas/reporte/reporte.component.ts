import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

import { Reporte } from '../../../../Interfaces/reporte.model';
import { VentaService } from '../../../../Servicios/venta.service';
import { UtilidadService } from 'src/app/ZModulos/utilidad.service';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class ReporteComponent implements OnInit {
  formFiltro: FormGroup;
  listaVentasReporte: Reporte[] = [];
  displayedColumns: string[] = [
    'fechaRegistro',
    'numeroVenta',
    'tipoPago',
    'total',
    'producto',
    'cantidad',
    'precio',
    'totalProducto'];

  dataVentaReporte = new MatTableDataSource(this.listaVentasReporte);
  @ViewChild(MatPaginator) paginacionTabla!: MatPaginator;

  constructor(
    private fb: FormBuilder,
    private _ventaServicio: VentaService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formFiltro = this.fb.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.cargarListadoVentasDetalladas();
  }

  ngAfterViewInit() {
    this.dataVentaReporte.paginator = this.paginacionTabla;
  }

  buscarVentas() {

    const _fechaInicio = moment(this.formFiltro.value.fechaInicio).format('DD/MM/YYYY');
    const _fechaFin = moment(this.formFiltro.value.fechaFin).format('DD/MM/YYYY');

    if (_fechaInicio === "Invalid date" || _fechaFin === "Invalid date") {
      this._utilidadServicio.mostrarAlerta("Debe ingresar ambas fechas", 'Oops!');
      return;
    }

    this._ventaServicio.reporteVentas$(_fechaInicio,_fechaFin).subscribe({
      next: (data) => {
        if (data.estadoData) {
          this.listaVentasReporte = data.cuerpoData;
          this.dataVentaReporte.data = data.cuerpoData;
        }
        else {
          this.listaVentasReporte = [];
          this.dataVentaReporte.data = [];
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", 'Oops!');
        }
          
      },
      error: (e) => {
      },
      complete: () => {

      }
    })

  }

   exportarExcel() {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(this.listaVentasReporte);

    XLSX.utils.book_append_sheet(wb, ws, "Reporte");
    XLSX.writeFile(wb, "Reporte Ventas.xlsx")
   }

   cargarListadoVentasDetalladas() {
    this._ventaServicio.listarRegistrosDetallados$().subscribe({
      next: (data) => {
        if (data.estadoData){
          this.listaVentasReporte = data.cuerpoData;
          this.dataVentaReporte.data = data.cuerpoData;
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
