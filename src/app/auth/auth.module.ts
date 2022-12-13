import { SpinnerComponent } from './spinner/spinner.component';
import { authInterceptorProviders } from './../services/auth.interceptor';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { PelotaComponent } from './pelota/pelota.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './recuperar/change-password.component';
import { AutorizarComponent } from './autorizar/autorizar.component';



@NgModule({
  declarations: [
    LoginComponent,
    RecuperarComponent,
    RegistroComponent,
    PelotaComponent,
    ChangePasswordComponent,
    SpinnerComponent,
    AutorizarComponent
  ],
  providers:[authInterceptorProviders],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
