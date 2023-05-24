import { Component, OnInit } from '@angular/core';

import { Chart, registerables } from 'node_modules/chart.js'; //npm install chart.js
//import { DashboardService } from '../../../../Controladores/dash-board.service';

Chart.register(...registerables);

@Component({
  selector: 'app-contactenos',
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.scss']
})
export class ContactenosComponent implements OnInit {

  constructor(
    
  ) {}

  ngOnInit(): void {

  }

}
