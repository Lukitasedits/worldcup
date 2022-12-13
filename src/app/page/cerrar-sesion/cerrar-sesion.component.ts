import { LoginService } from './../../services/login.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entities/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.scss']
})
export class CerrarSesionComponent implements OnInit {

  constructor(private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){
    this.router.navigate(['/sesion']);
    this.loginService.logout();
  }

}
