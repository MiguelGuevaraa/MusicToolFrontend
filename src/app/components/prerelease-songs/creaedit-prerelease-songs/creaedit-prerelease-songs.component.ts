import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrereleaseSongsService } from '../../../services/prerelease-songs.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { PreRelease_Songs } from '../../../models/PreRelease_Songs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaedit-prerelease-songs',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatDatepickerModule,MatButtonModule,CommonModule,ReactiveFormsModule],
  templateUrl: './creaedit-prerelease-songs.component.html',
  styleUrl: './creaedit-prerelease-songs.component.css'
})
export class CreaeditPrereleaseSongsComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  prerelease: PreRelease_Songs = new PreRelease_Songs();
  id: number = 0;
  edicion: boolean = false;
  listagenero: { value: String; viewValue: string }[] = [
    { value: 'rock', viewValue: 'rock' },
    { value: 'regueton', viewValue: 'regueton' },
    { value: 'perreo', viewValue: 'perreo' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private ps: PrereleaseSongsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hid: [''],
      hname: ['', Validators.required],
      hgenre: ['', Validators.required],
      hduration: ['', Validators.required],
     
    });

  }
  insertar(): void {
    if (this.form.valid) {
      this.prerelease.id = this.form.value.hid;
      this.prerelease.name = this.form.value.hname;
      this.prerelease.genre = this.form.value.hgenre;
      this.prerelease.duration = this.form.value.hduration;
     
      if (this.edicion) {
        this.ps.update(this.prerelease).subscribe((data) => {
          this.ps.list().subscribe((data) => {
            this.ps.setList(data);
          });
        });
      } else {
        this.ps.insert(this.prerelease).subscribe((data) => {
          this.ps.list().subscribe((data) => {
            this.ps.setList(data);
          });
        });
      }
    }
    this.router.navigate(['musica']);
  }

  init() {
    if (this.edicion) {
      this.ps.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id),
          hname: new FormControl(data.name),
          hgenre: new FormControl(data.genre),
          hduration: new FormControl(data.duration),
        });
      });
    }
  }
}
