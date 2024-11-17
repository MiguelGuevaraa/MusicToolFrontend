import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../../models/Mensaje';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MensajeService } from '../../../services/mensaje.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-listarmensaje',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listarmensaje.component.html',
  styleUrl: './listarmensaje.component.css'
})
export class ListarmensajeComponent implements OnInit{
  dataSource: MatTableDataSource<Mensaje>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'action1',
    'action2'
  ];
  constructor(private ms: MensajeService) {}
  ngOnInit(): void {
    this.ms.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ms.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }
   eliminar(id: number) {
    this.ms.delete(id).subscribe((data) => {
      this.ms.list().subscribe((data) => {
        this.ms.setList(data);
      });
    });
}
}
