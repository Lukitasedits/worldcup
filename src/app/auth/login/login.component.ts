import { LoginService } from './../../services/login.service';
import { FiguritaService } from 'src/app/services/figurita.service';
import { Usuario } from './../../entities/usuario';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  //private _usuario: {username: string, password: string} = {username:'', password: ''};
  usuario :Usuario = new Usuario;
  @Output() registrado = new EventEmitter<boolean>();
  @Output() passwordForgoten = new EventEmitter<boolean>();
  recoverPassword: boolean = false;

  errores: string[] = [];

  constructor(private usuariosService: UsuariosService, private router: Router, private figuritasService:FiguritaService, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  registrarse(){
    this.router.navigate(['/auth/registro'])
  }

  activarPasswordForgotten(){
    this.router.navigate(['/auth/recuperar'])
  }

  buscarUsuario(){
    /*this.usuariosService.getUsuario(this.usuario).subscribe(
      usuarioEnTabla => {
          if(this.usuario.username == usuarioEnTabla.username && this.usuario.password == usuarioEnTabla.password){
            Swal.fire(`Bienvenido ${this.usuario.username}`, `Haz Ingresado correctamente.`, 'success');
            UsuariosService.usuarioLogueado = usuarioEnTabla;
            this.figuritasService.getFiguritasUsuario().subscribe( f => {
              //UsuariosService.usuarioLogueado.figuritas = f
              console.log(UsuariosService.usuarioLogueado);
            })
            this.router.navigate(['/album/inicio'])
          } else{
            console.error('Ese Usuario no existe');
            this.recoverPassword = true;
          }
        },
        e => {
          this.errores.push(e.error.mensaje)
        }
      );*/


      /*this.usuariosService.getUsuario(this.usuario).subscribe(
        usuarioEnTabla => {
            if(this.usuario.username == usuarioEnTabla.username && this.usuario.password == usuarioEnTabla.password){
              Swal.fire(`Bienvenido ${this.usuario.username}`, `Haz Ingresado correctamente.`, 'success');
              this.loginService.generateToken(this.usuario).subscribe(
                (data:any) => {
                  this.loginService.loginUser(data.token);
                  this.loginService.getCurrentUser().subscribe((user:any) => {
                    this.loginService.setUser(user);

                    this.router.navigate(['/album/inicio'])
                  })
                });
            } else{
              this.errores.push('No existe el usuario.')
              this.recoverPassword = true;
            }
          }
      )*/

      this.loginService.generateToken(this.usuario).subscribe(
        (data:any) => {
          //console.log(data)
          this.errores.length = 0;
          this.loginService.loginUser(data.token);
          this.loginService.getCurrentUser().subscribe((user:any) => {
            this.loginService.setUser(user);

            this.router.navigate(['/album/inicio'])
            Swal.fire(`Bienvenido ${this.usuario.username}`, `Haz Ingresado correctamente.`, 'success');
          })
        }, (e) =>{
          this.errores.length = 0;
          this.errores.push(e.error.mensaje)
          this.recoverPassword = true
        }
      );
    }



 /*  set usuario(usuario : {username: string, password: string}){
    this._usuario = usuario;
  }

  get usuario(): {username: string, password: string}{
    return this._usuario;
  } */
}
