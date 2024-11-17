import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { SuscriptionService } from '../../../services/suscription.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Suscription } from '../../../models/Suscription';

@Component({
  selector: 'app-listar-suscription',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listar-suscription.component.html',
  styleUrl: './listar-suscription.component.css'
})
export class ListarSuscriptionComponent implements OnInit {
  dataSource: MatTableDataSource<Suscription>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'action1',
    'action2',
  ];
  constructor(private sb: SuscriptionService) {}
  ngOnInit(): void {
    this.sb.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sb.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }

    eliminar(id: number) {
      this.sb.delete(id).subscribe((data) => {
        this.sb.list().subscribe((data) => {
          this.sb.setList(data);
        });
      });
  }
}



