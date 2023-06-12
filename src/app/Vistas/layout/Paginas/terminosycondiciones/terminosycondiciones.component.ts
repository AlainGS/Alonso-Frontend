import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

//import { Chart, registerables } from 'node_modules/chart.js'; //npm install chart.js

//Chart.register(...registerables);

@Component({
  selector: 'app-terminosycondiciones',
  templateUrl: './terminosycondiciones.component.html',
  styleUrls: ['./terminosycondiciones.component.scss'],
})
export class TerminosYCondicionesComponent implements OnInit {
  panelOpenState = false;

  constructor(
    
  ) {}

  ngOnInit(): void {
  }
}
