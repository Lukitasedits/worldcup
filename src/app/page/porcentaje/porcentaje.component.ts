import { LoginService } from './../../services/login.service';
import { UsuariosService } from './../../services/usuarios.service';

import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { FiguritaService } from 'src/app/services/figurita.service';

@Component({
  selector: 'app-porcentaje',
  templateUrl: './porcentaje.component.html',
  styleUrls: ['./porcentaje.component.scss']
})
export class PorcentajeComponent implements OnInit, AfterViewInit {

  @ViewChild('progresoRef') progresoRef!: ElementRef;

  porcentaje: string = '0';

  constructor(private figuritaService: FiguritaService, private render: Renderer2, private loginService: LoginService) {
    loginService.getUser().subscribe( user => {
      this.porcentaje = (user.figuritas.length*100/646).toFixed(2);
    });
    //this.porcentaje = (UsuariosService.usuarioLogueado.figuritas.length*100/646).toFixed(2);
   }

  ngAfterViewInit(): void {
    this.actualizarProgreso();
  }


  ngOnInit(): void {

  }



  actualizarProgreso(){
    const progreso = this.progresoRef.nativeElement;

    let porcentajeNum = 0;
    this.loginService.getUser().subscribe( user => {
      porcentajeNum = user.figuritas.length*100/646;
    });

    if(porcentajeNum < 12.5){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, ' + (porcentajeNum*50/12.5+50) + '% 0)')
    } else if (porcentajeNum < 25){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, 100% 0, 100% ' + (porcentajeNum*50/25.5) + '%)')
    } else if (porcentajeNum < 37.5){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, 100% 0, 100% ' + (porcentajeNum*50/37.5+50) + '%)')
    } else if (porcentajeNum < 50){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, ' + (100-(porcentajeNum*50/50)) + '%  100% )')
    } else if (porcentajeNum < 62.5){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, ' + (50-(porcentajeNum*50/62.5)) + '%  100% )')
    } else if(porcentajeNum < 75){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 ' + (100-(porcentajeNum*50/75)) + '%)')
    } else if(porcentajeNum < 87.5){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 ' + (50-(porcentajeNum*50/87.5)) + '%)')
    } else if(porcentajeNum < 100){
      this.render.setStyle(progreso, 'clip-path', 'polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0,' + ((porcentajeNum*50/100)) + '% 0 )')
    }
  }

}


/*    clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0); //100%

      clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0); //87.5

      clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 50%); //75%

     clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%); //62.5%

     clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 50% 100%); //50%

     clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 100%); //37.5%

     clip-path: polygon(50% 50%, 50% 0, 100% 0, 100% 50%); //25%

     clip-path: polygon(50% 50%, 50% 0, 100% 0); //12.5%

     clip-path: polygon(50% 50%, 50% 0, 50% 0); //0%
 */
