import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Users } from '../../../models/Users';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-creaeditusuarios',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatDatepickerModule,MatButtonModule,ReactiveFormsModule,CommonModule,MatNativeDateModule],
  templateUrl: './creaedit-usuarios.component.html',
  styleUrl: './creaedit-usuarios.component.css'
})
export class CreaeditusuariosComponent {
  form: FormGroup = new FormGroup({});
  usuarios: Users = new Users();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uS: UsuariosService,
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
      husername: ['', Validators.required],
      hpassword: ['', Validators.required],
      hemail: ['', Validators.required],
      hphone: ['', Validators.required],
      henabled: ['', Validators.required],
     
    });

  }
  insertar(): void {
    if (this.form.valid) {
      this.usuarios.id = this.form.value.hid;
      this.usuarios.username = this.form.value.husername;
      this.usuarios.password = this.form.value.hpassword;
      this.usuarios.email = this.form.value.hemail;
      this.usuarios.phone = this.form.value.hphone;
      this.usuarios.enabled = this.form.value.henabled;
     
      if (this.edicion) {
        console.log(this.usuarios)
        this.uS.update(this.usuarios).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      } else {
        this.uS.insert(this.usuarios).subscribe((data) => {
          this.uS.list().subscribe((data) => {
            this.uS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['usuarios']);
  }

  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id),
          husername: new FormControl(data.username),
          hpassword: new FormControl(data.password),
          hemail: new FormControl(data.email),
          hphone: new FormControl(data.phone),
          henabled: new FormControl(data.enabled)
        });
      });
    }
  }
}
