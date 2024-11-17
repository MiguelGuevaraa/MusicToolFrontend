import { Routes } from '@angular/router';
import { MerchandisingComponent } from './components/merchandising/merchandising.component';
import { CreaeditMerchandisingComponent } from './components/merchandising/creaedit-merchandising/creaedit-merchandising.component';
import { AnswerComponent } from './components/answer/answer.component';
import { CreaeditanswerComponent } from './components/answer/creaeditanswer/creaeditanswer.component';
import { SurveyComponent } from './components/survey/survey.component';
import { CreaeditSurveyComponent } from './components/survey/creaedit-survey/creaedit-survey.component';
import { SuscriptionComponent } from './components/suscription/suscription.component';
import { CreaeditSuscriptionComponent } from './components/suscription/creaedit-suscription/creaedit-suscription.component';import { CreaeditPrereleaseSongsComponent } from './components/prerelease-songs/creaedit-prerelease-songs/creaedit-prerelease-songs.component';
import { PrereleaseSongsComponent } from './components/prerelease-songs/prerelease-songs.component';
import { MensajeComponent } from './components/mensaje/mensaje.component';
import { CreaeditmensajeComponent } from './components/mensaje/creaeditmensaje/creaeditmensaje.component';
import { PublicsComponent } from './components/publics/publics.component';
import { CreaeditPublicsComponent } from './components/publics/creaedit-publics/creaedit-publics.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { CreaeditpagosComponent } from './components/pagos/creaeditpagos/creaeditpagos.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CreaeditusuariosComponent } from './components/usuarios/creaedit-usuarios/creaedit-usuarios.component';
import { CreaeditRolesComponent } from './components/roles/creaedit-roles/creaedit-roles.component';
import { RolesComponent } from './components/roles/roles.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { ReportetotalcancionesComponent } from './components/reportes/reportetotalcanciones/reportetotalcanciones.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { seguridadGuard } from './guard/seguridad.guard';
import { ReportetotaltiposubComponent } from './components/reportes/reportetotaltiposub/reportetotaltiposub.component';
import { ReportetotalmetodoComponent } from './components/reportes/reportetotalmetodo/reportetotalmetodo.component';
import { ReportetotalrespuestasComponent } from './components/reportes/reportetotalrespuestas/reportetotalrespuestas.component';
import { ReportetotalencuestasComponent } from './components/reportes/reportetotalencuestas/reportetotalencuestas.component';
import { ReportetotalsongsComponent } from './components/reportes/reportetotalsongs/reportetotalsongs.component';
;

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  
    {
        path: 'merchandising',
        component: MerchandisingComponent,
        children:[
            {
                path:'nuevo',
                component: CreaeditMerchandisingComponent,
            },  
            {
                path:'editarmercha/:id',
                component:CreaeditMerchandisingComponent,
            }
        ],
        canActivate: [seguridadGuard],
    },
    {
      path: 'answer',
      component: AnswerComponent,
      children:[
        {
          path: 'nuevo',
          component: CreaeditanswerComponent,
        },
        {
          path: 'editaranswer/:id',
          component:CreaeditanswerComponent,
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
      path:'survey',
      component: SurveyComponent,
      children:[
        {
          path: 'nuevo',
          component:CreaeditSurveyComponent,
        },
        {
          path: 'editarsurvey/:id',
          component:CreaeditSurveyComponent,
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
      path: 'subscription',
      component: SuscriptionComponent,
      children:[
        {
          path: 'nuevo',
          component: CreaeditSuscriptionComponent,
        },
        {
          path: 'editarsub/:id',
          component: CreaeditSuscriptionComponent
        }
      ],
      canActivate: [seguridadGuard],
      
    },
    {
      path: 'musica',
      component: PrereleaseSongsComponent,
      children:[
        {
          path: 'nuevo',
          component: CreaeditPrereleaseSongsComponent,
        },
        {
          path: 'editarprerelease/:id',
          component: CreaeditPrereleaseSongsComponent
        }
      ],
      canActivate: [seguridadGuard],
      
    },
    {
      path: 'mensaje',
      component: MensajeComponent,
      children:[
        {
          path: 'nuevo',
          component: CreaeditmensajeComponent,
        },
        {
          path:'editarmensaje/:id',
          component: CreaeditmensajeComponent
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
      path: 'publicaciones',
      component: PublicsComponent,
      children:[
        {
          path:'nuevo',
          component: CreaeditPublicsComponent,
        },
        {
          path:'editarpubli/:id',
          component: CreaeditPublicsComponent
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
      path: 'pagos',
      component: PagosComponent,
      children:[{
        path: 'nuevo',
        component: CreaeditpagosComponent,
      },
      {
        path: 'editarpagos/:id',
        component:CreaeditpagosComponent
      }
    ],
    canActivate: [seguridadGuard],
    },
    {
      path: 'usuarios',
      component: UsuariosComponent,
      children:[
        {
          path: 'nuevo',
          component:CreaeditusuariosComponent
        },
        {
          path:'editarusuario/:id',
          component: CreaeditusuariosComponent
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
      path: 'roles',
      component: RolesComponent,
      children:[
        {
          path: 'nuevo',
          component:CreaeditRolesComponent
        },
        {
          path:'editarroles/:id',
          component: CreaeditRolesComponent
        }
      ],
      canActivate: [seguridadGuard],
    },
    {
      path: 'reportes',
      component: ReportesComponent,
      children: [
        {
          path: 'total',
          component: ReportetotalcancionesComponent,
        },
        {
          path: 'totalsongs',
          component: ReportetotalsongsComponent
        },
        {
          path:'tiposub',
          component: ReportetotaltiposubComponent
        },
        {
          path:'metodopago',
          component: ReportetotalmetodoComponent
        },
        {
          path:'totalrespuestas',
          component: ReportetotalrespuestasComponent
        },
        {
            path:'totalencuestas',
            component: ReportetotalencuestasComponent,
        }
      ],
    },
    {
      path: 'homes',
      component: HomeComponent,
      canActivate: [seguridadGuard], // solo construcciones, se debe agregar a cada uno
    },
];

