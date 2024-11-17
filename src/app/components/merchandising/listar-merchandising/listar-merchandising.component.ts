import { Component, OnInit } from '@angular/core';
import { Merchandising } from '../../../models/Merchandising';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MerchandisingService } from '../../../services/merchandising.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listar-merchandising',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule, RouterModule],
  templateUrl: './listar-merchandising.component.html',
  styleUrl: './listar-merchandising.component.css'
})
export class ListarMerchandisingComponent implements OnInit {
  dataSource: MatTableDataSource<Merchandising> = new MatTableDataSource();
  
  displayedColumns: string[] = [
    'c1', 
    'c2',
    'c3',
    'c4',
    'accion01',
    'accion02',
  ];

  constructor(private vS: MerchandisingService) {}

  ngOnInit(): void {
    this.vS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.vS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }



  eliminar(id: number) {
    this.vS.delete(id).subscribe((data) => {
      this.vS.list().subscribe((data) => {
        this.vS.setList(data);
      });
    });
  }
}

