import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPublicsComponent } from './listar-publics/listar-publics.component';

@Component({
  selector: 'app-publics',
  standalone: true,
  imports: [RouterOutlet,ListarPublicsComponent],
  templateUrl: './publics.component.html',
  styleUrl: './publics.component.css'
})
export class PublicsComponent {
  constructor(public route:ActivatedRoute) {}
}
