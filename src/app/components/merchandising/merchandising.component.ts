import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarMerchandisingComponent } from './listar-merchandising/listar-merchandising.component';

@Component({
  selector: 'app-merchandising',
  standalone: true,
  imports: [RouterOutlet, ListarMerchandisingComponent],
  templateUrl: './merchandising.component.html',
  styleUrl: './merchandising.component.css',
})
export class MerchandisingComponent {
  constructor(public route: ActivatedRoute) {}
}
