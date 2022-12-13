import { EmailValuesDto } from './../../entities/email-values-dto';
import { EmailPasswordService } from './../../services/email-password.service';
import  Swal  from 'sweetalert2';
import { UsuariosService } from './../../services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entities/usuario';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {

  cargando: boolean = false;
  errores: string[] = [];
  dto: EmailValuesDto = new EmailValuesDto('', '');

  constructor(private emailPasswordService: EmailPasswordService) {}

  enviar(){
    this.errores.length = 0;
    /* this.usuariosService.existUsuario(this._usuario).subscribe(
      result => {
        if(result){
          this.usuariosService.enviarMailRecuperacion();
        } else {
          console.error('el usuario ' + this.usuario.username + ' no existe o no le corresponde ese mail')
        }
      }
    ) */
   /*  this.usuariosService.getUsuario(this.usuario).subscribe(
      usuarioEnTabla => {
        if(this.usuario.username == usuarioEnTabla.username && this.usuario.email == usuarioEnTabla.email){
          Swal.fire('Mail Enviado!', 'Revisá el correo.', 'success');
        } else {
          this.errores.push('El usuario ' + this.usuario.username + ' no corresponde con el email ' + this.usuario.email)
        }
      },
      e => {
        this.errores.push(e.error.mensaje);
      }
    ) */
    this.cargando = true;
    this.emailPasswordService.sendEmailRecover(this.dto).subscribe(
      data => {
        this.cargando = false;
        Swal.fire('Mail Enviado!', data.mensaje, 'success');
      },
      e =>{
        this.cargando = false
        this.errores.push(e.error.mensaje)
      }

    )
  }

  ngOnInit(): void {
  }

}
