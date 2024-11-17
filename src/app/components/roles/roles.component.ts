import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ListarRolesComponent } from './listar-roles/listar-roles.component';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [RouterOutlet, ListarRolesComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  constructor(public route:ActivatedRoute){}
}
