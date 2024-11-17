import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Answer } from '../../../models/Answer';
import { AnswerServiceService } from '../../../services/answer.service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SurveyServiceService } from '../../../services/survey.service.service';
import { Survey } from '../../../models/Survey';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditanswer',
  standalone: true,
  imports: [ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,],
  templateUrl: './creaeditanswer.component.html',
  styleUrl: './creaeditanswer.component.css'
})
export class CreaeditanswerComponent implements OnInit{
  form: FormGroup = new FormGroup ({});
  listasurvey: Survey[] = [];
  answer :Answer = new Answer()
  edicion: boolean = false;
  id: number = 0;
  constructor(private formBuilder: FormBuilder,
    private surv: SurveyServiceService,
    private ans:AnswerServiceService,
    private router:Router,
    private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.form= this.formBuilder.group({
      hid_Respuestas: [''],
      hrespuesta_1: ['', Validators.required],
      hespuesta_2: ['', Validators.required],
      hsu: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
  
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.surv.list().subscribe((data) => {
      this.listasurvey = data;
    });
  
  }
  insertar(): void {
    if(this.form.valid){
      this.answer.id_Respuestas=this.form.value.hid_Respuestas
      this.answer.respuesta_1=this.form.value.hrespuesta_1
      this.answer.respuesta_2=this.form.value.hespuesta_2
      this.answer.su=this.form.value.hsu
      if (this.edicion) {
        this.ans.update(this.answer).subscribe((data) => {
          this.ans.list().subscribe((data) => {
            this.ans.setList(data);
          });
         

        });
      }else{
      console.log(this.answer)
      console.log(this.listasurvey)
      this.ans.insert(this.answer).subscribe(data=>{
        this.ans.list().subscribe(data=>{
          this.ans.setList(data);
        })
      })
    }
      
    }
    
    this.router.navigate(['answer']);
  }
  init() {
    if (this.edicion) {
      this.ans.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid_Respuestas: new FormControl(data.id_Respuestas),
          hrespuesta_1: new FormControl(data.respuesta_1),
          hespuesta_2: new FormControl(data.respuesta_2),
          hsu: new FormControl(data.su),
        });
        this.answer =data;
      });
    }
  }

}
