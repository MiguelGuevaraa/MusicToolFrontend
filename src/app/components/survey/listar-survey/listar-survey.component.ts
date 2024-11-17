import { Component, OnInit } from '@angular/core';
import { Survey } from '../../../models/Survey';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { SurveyServiceService } from '../../../services/survey.service.service';

@Component({
  selector: 'app-listar-survey',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listar-survey.component.html',
  styleUrl: './listar-survey.component.css'
})
export class ListarSurveyComponent implements OnInit {
  dataSource: MatTableDataSource<Survey>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'action1',
    'action2'
  ];
  constructor(private sV: SurveyServiceService) {}
  ngOnInit(): void {
    this.sV.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sV.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }

    eliminar(id: number) {
      this.sV.delete(id).subscribe((data) => {
        this.sV.list().subscribe((data) => {
          this.sV.setList(data);
        });
      });
  }
}
