import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Publics } from '../../../models/Publics';
import { PublicsService } from '../../../services/publics.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-creaedit-publics',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatDatepickerModule,MatButtonModule,CommonModule,ReactiveFormsModule,
    MatDatepicker],
  templateUrl: './creaedit-publics.component.html',
  styleUrl: './creaedit-publics.component.css'
})
export class CreaeditPublicsComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  public: Publics = new Publics();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ps: PublicsService,
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
      hcontent: ['', Validators.required],
      hdate: ['', Validators.required],
      hcomments: ['', Validators.required],
     
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.public.id = this.form.value.hid;
      this.public.content = this.form.value.hcontent;
      this.public.date = this.form.value.hdate;
      this.public.comments = this.form.value.hcomments;
      if (this.edicion) {
        this.ps.update(this.public).subscribe((data) => {
          this.ps.list().subscribe((data) => {
            this.ps.setList(data);
          });
        });
      } else {
        this.ps.insert(this.public).subscribe((data) => {
          this.ps.list().subscribe((data) => {
            this.ps.setList(data);
          });
        });
      }
    }
    this.router.navigate(['publicaciones']);
  }

  init() {
    if (this.edicion) {
      this.ps.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id),
          hcontent: new FormControl(data.content),
          hdate: new FormControl(data.date),
          hcomments: new FormControl(data.comments),
        });
      });
    }
  }
    
}
