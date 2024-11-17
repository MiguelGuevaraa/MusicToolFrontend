import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ReportetotalcancionesComponent } from './reportetotalcanciones/reportetotalcanciones.component';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [RouterOutlet, ReportetotalcancionesComponent],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  constructor(public route: ActivatedRoute){}
}
