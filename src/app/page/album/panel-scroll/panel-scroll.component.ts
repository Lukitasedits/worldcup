
import { Component, ElementRef, OnInit, Renderer2, ViewChild, QueryList, Input, HostListener } from '@angular/core';
import { Pais } from 'src/app/entities/pais';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-panel-scroll',
  templateUrl: './panel-scroll.component.html',
  styleUrls: ['./panel-scroll.component.scss']
})
export class PanelScrollComponent implements OnInit {

  @ViewChild('panel') panelRef!: ElementRef;
  @ViewChild('circuloPanel') circuloPanel!: ElementRef;

  paises : Pais[] = PaisesService.paises;

  constructor(private render: Renderer2, private paisesService: PaisesService) { }

  ngOnInit(): void {
  }


  goToPage(index: number){
    this.paisesService.getScrollRefs(index).scrollIntoView({behavior: 'smooth'});
  }

  desplegarPanel(){
    this.render.setStyle(this.panelRef.nativeElement, 'transform', 'translatex(70px)');
    this.render.setStyle(this.circuloPanel.nativeElement, 'transform', 'translatex(-80px)')
  }

  cerrarPanel(){
    this.render.setStyle(this.panelRef.nativeElement, 'transform', 'translatex(0)');
    this.render.setStyle(this.circuloPanel.nativeElement, 'transform', 'translatex(-10px)')
  }

  hoverCirculo(){
    this.render.setStyle(this.circuloPanel.nativeElement, 'transform', 'translatex(-1px)')
  }

  notHoverCirculo(){
    this.render.setStyle(this.circuloPanel.nativeElement, 'transform', 'translatex(-10px)')
  }



}
