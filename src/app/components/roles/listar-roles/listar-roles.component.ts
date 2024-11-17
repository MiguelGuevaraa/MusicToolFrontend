import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';

@Component({
  selector: 'app-listar-roles',
  standalone: true,
  imports: [MatTableModule, MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listar-roles.component.html',
  styleUrl: './listar-roles.component.css'
})
export class ListarRolesComponent {
  dataSource: MatTableDataSource<Roles>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'action1',
    'action2'
  ];
  constructor(private rS: RolesService) {}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      console.log("Datos recibidos:", data);
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }
   eliminar(id: number) {
    console.log(id)
    this.rS.delete(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }

}
