import { LoginService } from './../../services/login.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Figurita } from 'src/app/entities/figurita';
import { FiguritaService } from 'src/app/services/figurita.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {
  @ViewChild('transitionRef') transitionRef! : ElementRef;


  constructor(private render : Renderer2, private router: Router, private figuritaService: FiguritaService, private loginService: LoginService) {
   }

  ngOnInit(): void {
  }

 goToAlbum(){
  const transicion = this.transitionRef.nativeElement;
  this.render.setStyle(transicion, 'display', 'block');
  setTimeout(()=>{
    this.render.setStyle(transicion, 'right', '0px');
    setTimeout(()=>{
      this.router.navigate(['/album/coleccion']);
    }, 1000)
  })
   // clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
 }

}
