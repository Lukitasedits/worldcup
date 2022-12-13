import { EmailValuesDto } from './../../entities/email-values-dto';
import { EmailPasswordService } from './../../services/email-password.service';
import { LoginService } from './../../services/login.service';
import { Router } from '@angular/router';
import { UsuariosService } from './../../services/usuarios.service';
import { Usuario } from './../../entities/usuario';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  @Output() registrado = new EventEmitter<boolean>() ;
  private _usuario: Usuario = new Usuario();
  spinner: boolean = false;
  errores: string[] = [];
  autorizacion: boolean = false;

  constructor(private usuariosService: UsuariosService, private router: Router, private loginService: LoginService, private emailService: EmailPasswordService) { }

  ngOnInit(): void {
  }

  yaRegistrado(){
    this.router.navigate(['/auth/login'])
  }

  create(){
    const password = (<HTMLInputElement>(document.getElementById('password'))).value;
    const rePassword = (<HTMLInputElement>(document.getElementById('re-password'))).value;
    //this.errores.length = 0;

    if(password == rePassword){
        this.usuariosService.create(this._usuario).subscribe(
            user => {
              let dto: EmailValuesDto = new EmailValuesDto(user.email, user.username);
              this.spinner = true;
              this.emailService.sendEmailRegister(dto).subscribe(
                response => {
                  this.spinner = false;
                  Swal.fire('Verifica tu cuenta', 'Enviamos un correo a ' + this._usuario.email + ' por favor, revise su casilla y verifique que este correo es tuyo.', 'success');
                },
                e => {
                  this.spinner = false;
                  this.errores.push("Hubo un error a la hora de mandar el mail, por favor inténtelo de nuevo más tarde.")
                }
              )

            }, e =>{
              if(e.error.mensaje != null){
                this.errores.push(e.error.mensaje)
              } else {
                this.errores = e.error.errors;
              }
            }
            );

    } else {
      this.errores.push('Las contraseñas no coinciden.');
    }

  }


  set usuario(usuario: Usuario){
    this._usuario = usuario;
  }

  get usuario(): Usuario{
    return this._usuario;
  }

}
