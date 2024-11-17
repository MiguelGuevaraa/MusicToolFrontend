import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pagos } from '../../../models/Pagos';
import { Suscription } from '../../../models/Suscription';
import { PagosService } from '../../../services/pagos.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SuscriptionService } from '../../../services/suscription.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creaeditpagos',
  standalone: true,
  imports: [ReactiveFormsModule,MatFormFieldModule,MatSelectModule,MatDatepickerModule,MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './creaeditpagos.component.html',
  styleUrl: './creaeditpagos.component.css'
})
export class CreaeditpagosComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  
  listasuscripciones: Suscription[]=[];
  pago:Pagos=new Pagos();
  id: number = 0;
  edicion: boolean = false;
  listaTipopago: { value: String; viewValue: string }[] = [
    { value: 'visa', viewValue: 'visa' },
    { value: 'mastercard', viewValue: 'mastercard' },
    { value: 'efectivo', viewValue: 'efectivo' },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private pg: PagosService,
    private subs:SuscriptionService,
    private router: Router,
    private route: ActivatedRoute
  ){}
    ngOnInit(): void {
      this.route.params.subscribe((data:Params)=>{
        this.id=data['id'];
        this.edicion=data['id']!=null;
        this.init();
      })
      this.form = this.formBuilder.group({
        hid: [''],
        hmount: ['', Validators.required],
        hpay_date: ['', Validators.required],
        hpay_method: ['', Validators.required],
        hsubs: ['', Validators.required],
      });
      this.subs.list().subscribe((data) => {
        this.listasuscripciones = data;
      });
    }
    insertar(): void {
      if(this.form.valid){
        this.pago.id=this.form.value.hid
        this.pago.mount=this.form.value.hmount
        this.pago.pay_date=this.form.value.hpay_date
        this.pago.pay_method=this.form.value.hpay_method
        this.pago.subs=this.form.value.hsubs
  
        if (this.edicion) {
          this.pg.update(this.pago).subscribe((data) => {
            this.pg.list().subscribe((data) => {
              this.pg.setList(data);
            });
          });
        } else {
          this.pg.insert(this.pago).subscribe((data) => {
            this.pg.list().subscribe((data) => {
              this.pg.setList(data);
            });
          });
        }
      }
      this.router.navigate(['pagos']);
    }
  
    init() {
      if (this.edicion) {
        this.pg.listId(this.id).subscribe((data) => {
          this.form = new FormGroup({
            hid: new FormControl(data.id),
            hmount: new FormControl(data.mount),
            hpay_date: new FormControl(data.pay_date),
            hpay_method: new FormControl(data.pay_method),
            hsubs: new FormControl(data.subs),
          });
          this.pago = data;
        });
      }
    }
}
