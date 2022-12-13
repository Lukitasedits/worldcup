import { EmailPasswordService } from './../../services/email-password.service';
import { VerficationEmailDto } from './../../entities/verfication-email-dto';
import { EmailValuesDto } from './../../entities/email-values-dto';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Usuario } from './../../entities/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autorizar',
  template: ''
})
export class AutorizarComponent implements OnInit {

  constructor(private usuariosService: UsuariosService, private emailPasswordService: EmailPasswordService, private loginService: LoginService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let dto: VerficationEmailDto = new VerficationEmailDto('');
    console.log("autorizar");
    dto.tokenEmail = this.activatedRoute.snapshot.params['tokenEmail']
    console.log(dto.tokenEmail);

    this.emailPasswordService.habilitarUsuario(dto).subscribe(
      user =>{
        Swal.fire('Usuario habilitado', 'Iniciá sesión y disfrutá del album del mundial', 'success')
        this.router.navigate(['/auth/login']);
      }
    );
  }

  /* iniciarSesion(user: Usuario){
    console.log('iniciaSesion()');
    Swal.fire('Gracias por Registrarte', `el usuario ${user.username} se ha registrado correctamente.`, 'success');
              this.loginService.generateToken(user).subscribe(
                (data:any) => {
                  this.loginService.loginUser(data.token);
                  this.loginService.getCurrentUser().subscribe((user:any) => {
                    this.loginService.setUser(user);
                    this.router.navigate(['/album/inicio'])
                  })
                }
              );
  } */

}
