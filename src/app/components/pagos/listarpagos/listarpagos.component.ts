import { Component, OnInit } from '@angular/core';
import {  MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Pagos } from '../../../models/Pagos';
import { PagosService } from '../../../services/pagos.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-listarpagos',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listarpagos.component.html',
  styleUrl: './listarpagos.component.css'
})
export class ListarpagosComponent implements OnInit{
  dataSource: MatTableDataSource<Pagos> = new MatTableDataSource();
  displayedColumns: string[] = [
    'ctt1',
    'ctt2',
    'ctt3',
    'ctt4',
    'ctt5',
    'action1',
    'action2'
  ];
  constructor(private pg: PagosService) {}
  ngOnInit(): void {
    this.pg.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.pg.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

  eliminar(id:number){
    this.pg.delete(id).subscribe((data)=>{
      this.pg.list().subscribe((data)=>{
        this.pg.setList(data)
      })
    })
  }
}
