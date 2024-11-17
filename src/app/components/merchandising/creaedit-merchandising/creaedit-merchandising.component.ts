import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Merchandising } from '../../../models/Merchandising';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { MerchandisingService } from '../../../services/merchandising.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creaedit-merchandising',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './creaedit-merchandising.component.html',
  styleUrl: './creaedit-merchandising.component.css'
})
export class CreaeditMerchandisingComponent implements OnInit {
form: FormGroup= new FormGroup({});
Merchandising: Merchandising= new Merchandising();
c: number=0;
edicion: boolean = false;
listanombre:{value: string; viewValue: string} []= [
  {value: 'polo', viewValue: 'polo'},
  {value: 'calzado', viewValue: 'calzado'},
  {value: 'chompa', viewValue: 'chompa'},
];
constructor(
private formBuilder: FormBuilder,
private Vs: MerchandisingService,
private router: Router,
private route: ActivatedRoute,
){}
ngOnInit(): void {
  this.route.params.subscribe((data: Params)=>{
    this.c=data['id'];
    this.edicion=data['id'] !=null;
    this.init();
    
  });
  this.form=this.formBuilder.group({
    hc: [''],
    hname_merchandising:['',Validators.required],
    hdescription_merchandising:['',Validators.required],
    hprice_merchandising:['',Validators.required],
  })
}
insertar(): void {
  if (this.form.valid) {
    this.Merchandising.id_merchandising = this.c;
    this.Merchandising.id_merchandising = this.form.value.hc;
    this.Merchandising.name_merchandising = this.form.value.hname_merchandising;
    this.Merchandising.description_merchandising = this.form.value.hdescription_merchandising;
    this.Merchandising.price_merchandising = this.form.value.hprice_merchandising;
   
    if (this.edicion) {
      this.Vs.update(this.Merchandising).subscribe((data) => {
        this.Vs.list().subscribe((data) => {
          this.Vs.setList(data);
        });
      });
    } 
    else {
      this.Vs.insert(this.Merchandising).subscribe((data) => {
        this.Vs.list().subscribe((data) => {
          this.Vs.setList(data);
        });
      });
    }
  }
  this.router.navigate(['merchandising']);
}
init() {
  if (this.edicion) {
    this.Vs.listId(this.c).subscribe((data) => {
      this.form = new FormGroup({
        hc: new FormControl(data.id_merchandising),
        hname_merchandising: new FormControl(data.name_merchandising),
        hdescription_merchandising: new FormControl(data.description_merchandising),
        hprice_merchandising: new FormControl(data.price_merchandising),
        
      });
      this.Merchandising = data; 
    });
  }
}
}

