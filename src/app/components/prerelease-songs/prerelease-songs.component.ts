import { Component } from '@angular/core';
import { ActivatedRoute,  RouterOutlet } from '@angular/router';
import { ListarPrereleaseSongsComponent } from './listar-prerelease-songs/listar-prerelease-songs.component';

@Component({
  selector: 'app-prerelease-songs',
  standalone: true,
  imports: [RouterOutlet,ListarPrereleaseSongsComponent],
  templateUrl: './prerelease-songs.component.html',
  styleUrl: './prerelease-songs.component.css'
})
export class PrereleaseSongsComponent {
  constructor(public route:ActivatedRoute) {}
}
