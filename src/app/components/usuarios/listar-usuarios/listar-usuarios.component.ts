import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Users } from '../../../models/Users';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-listarusuarios',
  standalone: true,
  imports: [MatTableModule, MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarusuariosComponent implements OnInit{
  dataSource: MatTableDataSource<Users>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c4',
    'c5',
    'c6',
    'action1',
    'action2'
  ];
  constructor(private uS: UsuariosService) {}
  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      console.log("Datos recibidos:", data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.uS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }
   eliminar(id: number) {
    this.uS.delete(id).subscribe((data) => {
      this.uS.list().subscribe((data) => {
        this.uS.setList(data);
      });
    });
  }
}
