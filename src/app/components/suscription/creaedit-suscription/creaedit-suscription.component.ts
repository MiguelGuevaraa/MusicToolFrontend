import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Suscription } from '../../../models/Suscription';
import { SuscriptionService } from '../../../services/suscription.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-creaedit-suscription',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatDatepickerModule,MatButtonModule,ReactiveFormsModule,CommonModule,MatNativeDateModule],
  templateUrl: './creaedit-suscription.component.html',
  styleUrl: './creaedit-suscription.component.css'
})

export class CreaeditSuscriptionComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  suscription: Suscription = new Suscription();
  id: number = 0;
  edicion: boolean = false;

  listatipos: { value: string; viewValue: string }[] = [
    { value: 'basica', viewValue: 'basica' },
    { value: 'media', viewValue: 'media' },
    { value: 'vip', viewValue: 'vip' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private vS: SuscriptionService,
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
      htype_susciption: ['', Validators.required],
      hsub_date: ['', Validators.required],
     
    });

  }
  insertar(): void {
    if (this.form.valid) {
      this.suscription.id = this.form.value.hid;
      this.suscription.type_susciption = this.form.value.htype_susciption;
      this.suscription.sub_date = this.form.value.hsub_date;
     
      if (this.edicion) {
        console.log(this.suscription)
        this.vS.update(this.suscription).subscribe((data) => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
        });
      } else {
        this.vS.insert(this.suscription).subscribe((data) => {
          this.vS.list().subscribe((data) => {
            this.vS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['subscription']);
  }

  init() {
    if (this.edicion) {
      this.vS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id),
          htype_susciption: new FormControl(data.type_susciption),
          hsub_date: new FormControl(data.sub_date),
        });
      });
    }
  }
}
