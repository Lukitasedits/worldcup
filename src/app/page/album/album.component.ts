import { LoginService } from './../../services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Component, OnInit, Renderer2, ElementRef, ViewChildren, QueryList, ViewChild, HostListener, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FiguritaService } from 'src/app/services/figurita.service';
import { Figurita } from 'src/app/entities/figurita';
import { PaisesService } from 'src/app/services/paises.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit, AfterViewInit, OnDestroy{

  figuritas: Array<Array<Figurita>> = FiguritaService.figuritas;
  figuritasSelecciones!: Array<Array<Figurita>>;
  //@ViewChildren('paginaRef') paginaRef !: QueryList<ElementRef>
  @ViewChild('coverRef') coverRef!: ElementRef;
  tope: boolean = false;
  paginaActual: number = 0;
  trasladoY: number = 0;
  scrollDirection: number = 0;
  numPaginas!:number;


  constructor(private render: Renderer2, private paisesService: PaisesService, private route: Router, private usuariosService: UsuariosService, private loginService: LoginService, private scrollSrv: ScrollService) {
    this.actualizarUsuarioLogueado();
   }
  ngOnDestroy(): void {
    this.actualizarUsuarioLogueado();
  }

  ngOnInit(): void {
    //this.actualizarUsuarioLogueado();
    document.body.scrollTop = this.scrollSrv.getStorageScroll();
    this.inicializarFiguritasSelecciones();
  }

  ngAfterViewInit(): void {
      this.incializarHTMLReferences();
  }


  actualizarUsuarioLogueado(){
    this.loginService.getCurrentUser().subscribe( user => {
      console.log('update')
      console.log(user)
      this.loginService.setUser(user);
    });
  }

  inicializarFiguritasSelecciones(){
    this.figuritasSelecciones = this.figuritas.filter(function(seleccion: Array<Figurita>): boolean {
      const paisActual = seleccion[0].getPais().getAbreviatura();
      return ( paisActual != 'FWC' && paisActual !='FWC2' && paisActual!='C');
    })
  }

  incializarHTMLReferences(){
    let s: number = 0;
    let htmlRef = document.getElementById('pagina' + s);
    this.paisesService.reseteScrollRefs();
    while(htmlRef != null){
      this.paisesService.addScrollRefs(htmlRef);
      s++;
      htmlRef =  document.getElementById('pagina' + s);
    }
  }

  goToMenu(){
    this.route.navigate(['/album/inicio']);
  }


    /* @HostListener('window:scroll', [])
    onWindowScroll(){

      const referencia = this.paginaRef.toArray()[this.paginaActual].nativeElement;


      if(this.scrollDirection < window.scrollY){ //Si baja...

        if(referencia.getBoundingClientRect().bottom <= document.body.clientHeight){
          this.paginaActual++;
        }

        this.trasladoY = this.trasladoY+7;

        this.paginaRef.forEach( (p, i) => {
          if(i > this.paginaActual && i > 0)
          this.render.setStyle(p.nativeElement, 'transform', 'translateY(-' + this.trasladoY + 'px)')
        })
      } else { //Si sube

        if(referencia.getBoundingClientRect().top >= document.body.clientHeight){
          if(this.paginaActual > 0){
            this.paginaActual--;
          }
        }

        this.trasladoY = 7;

        this.paginaRef.forEach( (p, i) => {
          if(i < this.paginaActual && i > 0)
          this.render.setStyle(p.nativeElement, 'transform', 'translateY(' + this.trasladoY + 'px)')
        })

      }
      console.log(this.paginaActual);

      //console.log(this.paginaActual + ' -> ' + referencia.getBoundingClientRect().top)
      //console.log(document.body.clientHeight)
      this.scrollDirection = window.scrollY;
    } */



}
