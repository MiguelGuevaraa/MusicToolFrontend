import { Component, OnInit } from '@angular/core';
import { Publics } from '../../../models/Publics';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PublicsService } from '../../../services/publics.service';

@Component({
  selector: 'app-listar-publics',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listar-publics.component.html',
  styleUrl: './listar-publics.component.css'
})
export class ListarPublicsComponent implements OnInit{
  dataSource: MatTableDataSource<Publics>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'action1',
    'action2'
  ];
  constructor(private pb: PublicsService) {}
  ngOnInit(): void {
    this.pb.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pb.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }
   eliminar(id: number) {
    this.pb.delete(id).subscribe((data) => {
      this.pb.list().subscribe((data) => {
        this.pb.setList(data);
      });
    });
}
}
