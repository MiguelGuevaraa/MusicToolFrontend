import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarSuscriptionComponent } from './listar-suscription/listar-suscription.component';

@Component({
  selector: 'app-suscription',
  standalone: true,
  imports: [RouterOutlet,ListarSuscriptionComponent],
  templateUrl: './suscription.component.html',
  styleUrl: './suscription.component.css'
})
export class SuscriptionComponent {
  constructor(public route:ActivatedRoute) {}
}
