import { ActivatedRoute, Router } from '@angular/router';
import { EmailPasswordService } from './../../services/email-password.service';
import { ChangePasswordDto } from './../../entities/change-password-dto';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

dto: ChangePasswordDto = new ChangePasswordDto('', '', '');
errores: string[] = [];

  constructor(
    private emailPasswordService: EmailPasswordService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  enviar(){
    this.errores.length = 0;
    if(this.dto.password !== this.dto.confirmPassword){
      this.errores.push('Las contraseñas no coinciden');
    } else {
      this.dto.tokenPassword = this.activatedRoute.snapshot.params['tokenPassword']
      this.emailPasswordService.changePassword(this.dto).subscribe(
        data => {
          Swal.fire('Contraseña actualizada!', data.mensaje, 'success');
          this.router.navigate(['/auth/login'])
        },
        err =>{
          this.errores.push(err.error.mensaje)
        }
      );
    }
  }

}
