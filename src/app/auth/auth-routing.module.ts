import { AutorizarComponent } from './autorizar/autorizar.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './recuperar/change-password.component';

const routes: Routes = [
  /*{path: '', children:[
    {path:'', component: AuthComponent},
    {path:'**', redirectTo: ''}
  ]}*/
  {path:'',
  children: [
    {path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'recuperar', component: RecuperarComponent},
    {path: 'autorizar/:tokenEmail', component: AutorizarComponent},
    {path: 'change-password/:tokenPassword', component: ChangePasswordComponent},
    {path: '**', redirectTo:'login'}
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ]
})
export class AuthRoutingModule { }
