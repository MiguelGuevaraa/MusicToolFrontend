import { Component, OnInit } from '@angular/core';
import { Mensaje } from '../../../models/Mensaje';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensajeService } from '../../../services/mensaje.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Users } from '../../../models/Users';
import { UsuariosService } from '../../../services/usuarios.service';
import { Roles } from '../../../models/Roles';

@Component({
  selector: 'app-creaeditmensaje',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatDatepickerModule,MatButtonModule,CommonModule,ReactiveFormsModule],
  templateUrl: './creaeditmensaje.component.html',
  styleUrl: './creaeditmensaje.component.css'
})
export class CreaeditmensajeComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  mensaje: Mensaje = new Mensaje();
  id: number = 0;
  edicion: boolean = false;
  listauser: Users[] = [];
  rol: Roles[] = []
  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
    private ms: MensajeService,
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
      hdateSent: ['', Validators.required],
      hus: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
  
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.uS.list().subscribe((data) => {
      this.listauser = data;
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.mensaje.id = this.form.value.hid;
      this.mensaje.content = this.form.value.hcontent;
      this.mensaje.dateSent = this.form.value.hdateSent;
      this.mensaje.user = this.form.value.hus;
     
      if (this.edicion) {
        this.ms.update(this.mensaje).subscribe((data) => {
          this.ms.list().subscribe((data) => {
            this.ms.setList(data);
          });
        });
      } else {
        this.ms.insert(this.mensaje).subscribe((data) => {
          this.ms.list().subscribe((data) => {
            this.ms.setList(data);
          });
        });
      }
    }
    this.router.navigate(['mensaje']);
  }

  init() {
    if (this.edicion) {
      this.ms.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id),
          hcontent: new FormControl(data.content),
          hdateSent: new FormControl(data.dateSent),
          hus: new FormControl(data.user),
        });
        this.mensaje = data;
      });
    }
  }
}
