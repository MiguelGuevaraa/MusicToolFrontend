import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaranswerComponent } from './listaranswer/listaranswer.component';

@Component({
  selector: 'app-answer',
  standalone: true,
  imports: [RouterOutlet,ListaranswerComponent],
  templateUrl: './answer.component.html',
  styleUrl: './answer.component.css'
})
export class AnswerComponent {
constructor(public route: ActivatedRoute){}
}
