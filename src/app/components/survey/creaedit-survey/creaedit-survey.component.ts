import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Survey } from '../../../models/Survey';
import { SurveyServiceService } from '../../../services/survey.service.service';
import {  ActivatedRoute, Params, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core'; // Si usas moment
;

@Component({
  selector: 'app-creaedit-survey',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatDatepickerModule,MatButtonModule,ReactiveFormsModule,CommonModule, MatNativeDateModule,],
  templateUrl: './creaedit-survey.component.html',
  styleUrl: './creaedit-survey.component.css'
})
export class CreaeditSurveyComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  surv: Survey = new Survey();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private ss: SurveyServiceService,
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
      hid_survey: [''],
      hquestion1: ['', Validators.required],
      hquestion2: ['', Validators.required],
      htitle: ['', Validators.required],
      hdescription: ['', Validators.required],
      hcreationDate: ['', Validators.required],
     
    });

  }
  insertar(): void {
    if (this.form.valid) {
      this.surv.id = this.form.value.hid_survey;
      this.surv.question1 = this.form.value.hquestion1;
      this.surv.question2 = this.form.value.hquestion2;
      this.surv.title = this.form.value.htitle;
      this.surv.description = this.form.value.hdescription;
      this.surv.creationDate = this.form.value.hcreationDate;
     
      if (this.edicion) {
        this.ss.update(this.surv).subscribe((data) => {
          this.ss.list().subscribe((data) => {
            this.ss.setList(data);
          });
        });
      } else {
        this.ss.insert(this.surv).subscribe((data) => {
          this.ss.list().subscribe((data) => {
            this.ss.setList(data);
          });
        });
      }
    }
    this.router.navigate(['survey']);
  }

  init() {
    if (this.edicion) {
      this.ss.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid_survey: new FormControl(data.id),
          hquestion1: new FormControl(data.question1),
          hquestion2: new FormControl(data.question2),
          htitle: new FormControl(data.title),
          hdescription: new FormControl(data.description),
          hcreationDate: new FormControl(data.creationDate),
        });
      });
    }
  }

}
