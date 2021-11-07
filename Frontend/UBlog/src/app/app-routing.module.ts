import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { RegistrarseComponent } from './vistas/registrarse/registrarse.component';
import { BlogComponent } from './vistas/blog/blog.component';
import { DashboardUsuariosComponent } from './vistas/dashboard-usuarios/dashboard-usuarios.component';
import { AgregarUsuarioComponent } from './vistas/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from  './vistas/editar-usuario/editar-usuario.component';
import { DashboardPublicacionesComponent } from './vistas/dashboard-publicaciones/dashboard-publicaciones.component';
import { AgregarPublicacionComponent } from './vistas/agregar-publicacion/agregar-publicacion.component';
import { EditarPublicacionComponent } from './vistas/editar-publicacion/editar-publicacion.component';
import { UsuarioComponent } from './vistas/usuario/usuario.component';
import { DashboardPublicacionesvComponent } from './vistas/dashboard-publicacionesv/dashboard-publicacionesv.component';
import { InicioComponent } from './vistas/inicio/inicio.component';
import { VerpublicacionComponent} from './vistas/verpublicacion/verpublicacion.component';
import { ModperfilComponent } from './vistas/modperfil/modperfil.component';
import { PublicarComponent } from './vistas/publicar/publicar.component';
import { PerfilComponent } from './vistas/perfil/perfil.component';
import { PubliusuarioComponent } from './vistas/publiusuario/publiusuario.component';
import { ReportesComponent } from './vistas/reportes/reportes.component';
import { ReportespComponent } from './vistas/reportesp/reportesp.component';
import { PrincipioComponent } from './vistas/principio/principio.component';


const routes: Routes = [
  { path: '' , redirectTo:'principio' , pathMatch: 'full'},
  {path:'login', component:LoginComponent},
  {path:'registrarse' , component:RegistrarseComponent},
  {path:'blog' , component:BlogComponent},
  {path:'dashboard-usuarios' , component:DashboardUsuariosComponent},
  {path:'agregar-usuario', component:AgregarUsuarioComponent},
  {path:'editar-usuario/:username' , component:EditarUsuarioComponent},
  {path:'dashboard-publicaciones', component:DashboardPublicacionesComponent},
  {path:'agregar-publicacion' , component:AgregarPublicacionComponent},
  {path:'editar-publicacion/:url' , component:EditarPublicacionComponent},
  {path:'usuario/:username' , component:UsuarioComponent},
  {path:'dashboard-publicacionesv', component:DashboardPublicacionesvComponent},
  {path:'inicio', component:InicioComponent},
  {path:'verpublicacion/:url', component:VerpublicacionComponent},
  {path:'modperfil/:username', component:ModperfilComponent},
  {path:'publicar', component:PublicarComponent},
  {path:'perfil/:username', component:PerfilComponent},
  {path:'publiusuario/:url', component:PubliusuarioComponent},
  {path:'reportes', component:ReportesComponent},
  {path:'reportesp', component:ReportespComponent},
  {path:'principio', component:PrincipioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent,RegistrarseComponent,BlogComponent,DashboardUsuariosComponent,AgregarUsuarioComponent,
  EditarUsuarioComponent,DashboardPublicacionesComponent,AgregarPublicacionComponent,EditarPublicacionComponent,UsuarioComponent,
DashboardPublicacionesvComponent,InicioComponent,VerpublicacionComponent,ModperfilComponent,PublicarComponent,PerfilComponent,PubliusuarioComponent,ReportesComponent,ReportespComponent,PrincipioComponent]