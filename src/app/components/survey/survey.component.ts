import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarSurveyComponent } from './listar-survey/listar-survey.component';

@Component({
  selector: 'app-survey',
  standalone: true,
  imports: [RouterOutlet,ListarSurveyComponent],
  templateUrl: './survey.component.html',
  styleUrl: './survey.component.css'
})
export class SurveyComponent {
  constructor(public route:ActivatedRoute) {}
}
