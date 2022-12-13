import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { Pais } from 'src/app/entities/pais';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-proximo-partido',
  templateUrl: './proximo-partido.component.html',
  styleUrls: ['./proximo-partido.component.scss']
})
export class ProximoPartidoComponent implements OnInit, AfterViewInit {
  goles1 : number = 0;
  goles2 : number = 0;
  pais1: Pais = PaisesService.paises[9]
  pais2: Pais = PaisesService.paises[10];
  abreviatura1 : string = this.pais1.getAbreviatura();
  abreviatura2 : string = this.pais2.getAbreviatura();
  @ViewChild('bandera1') bandera1Ref!: ElementRef;
  @ViewChild('bandera2') bandera2Ref!: ElementRef;


  constructor(private render: Renderer2) { }
  ngAfterViewInit(): void {
    this.asignarElementos()
  }

  ngOnInit(): void {
  }

  asignarElementos(){
    const bandera1 = this.bandera1Ref.nativeElement;
    const bandera2 = this.bandera2Ref.nativeElement;

    this.render.setStyle(bandera1, 'background-image', 'url(/assets/banderas/' + this.pais1.getBandera() + '.png)')
    this.render.setStyle(bandera2, 'background-image', 'url(/assets/banderas/' + this.pais2.getBandera() + '.png)')

  }

}
