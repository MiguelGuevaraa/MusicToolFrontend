import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Roles } from '../../../models/Roles';
import { RolesService } from '../../../services/roles.service';
import { Users } from '../../../models/Users';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-creaedit-roles',
  standalone: true,
  imports: [MatInputModule,MatSelectModule,MatDatepickerModule,MatButtonModule,ReactiveFormsModule,CommonModule,MatNativeDateModule],
  templateUrl: './creaedit-roles.component.html',
  styleUrl: './creaedit-roles.component.css'
})
export class CreaeditRolesComponent {
  form: FormGroup = new FormGroup({});
  listauser: Users[]=[];
  roles: Roles = new Roles();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private uS: UsuariosService,
    private formBuilder: FormBuilder,
    private rS: RolesService,
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
      hrol: ['', Validators.required],
      huser: ['', Validators.required],
    });
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.uS.list().subscribe((data) => {
      this.listauser = data.filter(user=>user.enabled==true);
    });
  }
  insertar(): void {
    if (this.form.valid) {
      this.roles.id = this.form.value.hid;
      this.roles.rol = this.form.value.hrol;
      this.roles.user = this.form.value.huser;
     
      if (this.edicion) {
        console.log(this.roles)
        this.rS.update(this.roles).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      } else {
        this.rS.insert(this.roles).subscribe((data) => {
          this.rS.list().subscribe((data) => {
            this.rS.setList(data);
          });
        });
      }
    }
    this.router.navigate(['roles']);
  }

  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hid: new FormControl(data.id),
          hrol: new FormControl(data.rol),
          huser: new FormControl(data.user),
        });
        this.roles = data;
      });
    }
  }
}
