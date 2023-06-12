import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'node_modules/chart.js'; //npm install chart.js
import { DashboardService } from '../../../../Servicios/dash-board.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalIngresos: string = "0";
  totalVentas: string = "0";
  totalProductos: string = "0";

  constructor(    
    private _dashboardServicio: DashboardService
  ) {}

  ngOnInit(): void {

    this._dashboardServicio.resumen$().subscribe({
      next: (data) => {
        if (data.estadoData) {
          
          this.totalIngresos = data.cuerpoData.totalIngresos;
          this.totalVentas = data.cuerpoData.totalVentas;
          this.totalProductos = data.cuerpoData.totalProductos;

          this._dashboardServicio.graficoBarras$().subscribe({
            next: (datos) => {
              if(datos.estadoData){
                const arrayData: any[] = datos.cuerpoData;
                const labelTemp = arrayData.map((value) => value.fecha);
                const dataTemp = arrayData.map((value) => value.total);
                this.mostrarGrafico(labelTemp, dataTemp);
              }
            }
          })

        }
      },
      error: (e) => { },
      complete: () => { }
    })

  }

  mostrarGrafico(labelsGrafico:any[],dataGrafico:any[]) {
    const chartBarras = new Chart('chartBarras', {
      type: 'bar',
      data: {
        labels: labelsGrafico,
        datasets: [{
          label: '# de Ventas',
          data: dataGrafico,
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
