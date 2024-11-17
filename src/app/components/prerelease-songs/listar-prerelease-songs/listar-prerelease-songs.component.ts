import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { PrereleaseSongsService } from '../../../services/prerelease-songs.service';
import { PreRelease_Songs } from '../../../models/PreRelease_Songs';

@Component({
  selector: 'app-listar-prerelease-songs',
  standalone: true,
  imports: [MatTableModule,MatIconModule,MatButtonModule,RouterModule],
  templateUrl: './listar-prerelease-songs.component.html',
  styleUrl: './listar-prerelease-songs.component.css'
})
export class ListarPrereleaseSongsComponent implements OnInit{
  dataSource: MatTableDataSource<PreRelease_Songs>= new MatTableDataSource();
  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'action1',
    'action2'
  ];
  constructor(private ps: PrereleaseSongsService) {}
  ngOnInit(): void {
    this.ps.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ps.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
   }
   eliminar(id: number) {
    this.ps.delete(id).subscribe((data) => {
      this.ps.list().subscribe((data) => {
        this.ps.setList(data);
      });
    });
}
}
