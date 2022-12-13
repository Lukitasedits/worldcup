import { LoginService } from './../../../services/login.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild, AfterViewInit, OnChanges, SimpleChanges, AfterContentChecked, OnDestroy } from '@angular/core';
import { Figurita } from 'src/app/entities/figurita';
import { ThrowStmt } from '@angular/compiler';
import { FiguritaService } from 'src/app/services/figurita.service';
import { Usuario } from 'src/app/entities/usuario';

@Component({
  selector: 'app-sticker',
  templateUrl: './sticker.component.html',
  styleUrls: ['./sticker.component.scss']
})
export class StickerComponent implements OnInit, AfterViewInit{

  @Input('figurita') thisFigurita!: Figurita;

  @ViewChild('figuritaRef') figuritaRef!: ElementRef;
  @ViewChild('informacionRef') informacionRef!: ElementRef;
  @ViewChild('botones') botonesRef!: ElementRef;
  cantidad: number = 0;
  abreviaturaPais: string = '';
  isSeleccion: boolean = false;

  constructor(private render: Renderer2, private figuritaService: FiguritaService, private loginService: LoginService) { }



  ngOnInit(): void {
    //Busco la cantidad de esta figurita a través de la información del usuario
    this.loginService.getUser().subscribe( user => {

      (user as Usuario).figuritas.forEach(f => {
        if(f.idFigurita == this.thisFigurita.getId()){
          this.cantidad = f.cantidad;
          //console.log(f.idFigurita + ' => ' + f.cantidad)
        }
      })
    })

    this.abreviaturaPais = this.thisFigurita.getPais().getAbreviatura();
    this.isSeleccion = (this.abreviaturaPais != 'FWC' && this.abreviaturaPais != 'C')
  }

  ngAfterViewInit(): void {
    if(this.cantidad > 0){
      this.updateFigurita(true);
    }

  }


  //con este método pego o despego la figruita
  //(true => pega la figurita aplicando estilos y sumando cantidad;
  //false => despega la figurita y resta cantidad)
  updateFigurita(pegar: boolean){

      //ElementReferences ->  any
      const figuritaDOM = this.figuritaRef.nativeElement
      const informacionDOM = this.informacionRef.nativeElement;
      const botonesDOM = this.botonesRef.nativeElement;

      //Programo la ruta de la imagen
      const ruta = 'url(/assets/FIGUSSCAN/' + this.thisFigurita.getPais().getAbreviatura() + '/' + this.thisFigurita.getCodigo() + '.png)';

      //Aplico estilos con el Renderer2
      this.render.setStyle(figuritaDOM, 'background-image', (pegar)?ruta:'') //Aplico la ruta
      this.render.setStyle(figuritaDOM, 'cursor', (pegar)?'default':'pointer') //Adelanto la imagen para que quede por encima de los separadores
      this.render.setStyle(figuritaDOM, 'z-index', (pegar)?'1':'0') //Adelanto la imagen para que quede por encima de los separadores

      this.render.setStyle(informacionDOM, 'display', (pegar)?'none':'flex'); //Borro la información de la Figurita una vez pegada
      this.render.setStyle(botonesDOM, 'display', (pegar)?'flex':'none') //Dejo ver los botones
      this.render.setStyle(botonesDOM, 'z-index', (pegar)?'2':'0') //Dejo ver los botones


      if(pegar && this.cantidad == 0){ //Si quiero pegar la figurita y la cantidad es 0...
        this.cantidad++; //aumento la cantidad de la misma
        this.figuritaService.sumarFigurita(this.thisFigurita);  //sumo figurita a la tabla
      }

  }



  sumarCantidad(){
    this.cantidad++;  //sumo cantidad
    this.figuritaService.sumarFigurita(this.thisFigurita); //sumo figurita a la tabla
  }

  restarCantidad(){
    if(this.cantidad > 0){ //si la cantidad es mayor a 0
      this.cantidad--;  //resto la cantidad
      this.figuritaService.restarFigurita(this.thisFigurita); //resto la figurita de la tabla
    }
    if(this.cantidad == 0){ //si la cantidad es igual a 0 (después de haberse ejecutado el anterior condicional)
      this.updateFigurita(false); //"despego" la figurita
    }
  }
}
