import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Answer } from '../../../models/Answer';
import { AnswerServiceService } from '../../../services/answer.service.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listaranswer',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listaranswer.component.html',
  styleUrl: './listaranswer.component.css'
})
export class ListaranswerComponent implements OnInit {
  dataSource: MatTableDataSource<Answer> = new MatTableDataSource;
  displayedColumns:string[]=[
    'ctt1',
    'ctt2',
    'ctt3',
    'ctt4',
    'action1',
    'action2'
  ]
  constructor(private ans:AnswerServiceService){}
  ngOnInit(): void {
    this.ans.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ans.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id: number) {
    this.ans.delete(id).subscribe((data) => {
      this.ans.list().subscribe((data) => {
        this.ans.setList(data);
      });
    });
  }

}
