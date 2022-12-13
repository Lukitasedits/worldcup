import { Pais } from './../entities/pais';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor() { }

  static readonly paises : Pais[] = [
    Pais.ESPECIAL,
    Pais.CATAR,
    Pais.ECUADOR,
    Pais.SENEGAL,
    Pais.HOLANDA,
    Pais.INGLATERRA,
    Pais.IRAN,
    Pais.EEUU,
    Pais.GALES,
    Pais.ARGENTINA,
    Pais.ARABIA,
    Pais.MEXICO,
    Pais.POLONIA,
    Pais.FRANCIA,
    Pais.AUSTRALIA,
    Pais.DINAMARCA,
    Pais.TUNEZ,
    Pais.ESPAÑA,
    Pais.COSTARICA,
    Pais.ALEMANIA,
    Pais.JAPON,
    Pais.BELGICA,
    Pais.CANADA,
    Pais.MARRUECOS,
    Pais.CROACIA,
    Pais.BRASIL,
    Pais.SERBIA,
    Pais.SUIZA,
    Pais.CAMERUN,
    Pais.PORTUGAL,
    Pais.GHANA,
    Pais.URUGUAY,
    Pais.COREA,
    Pais.ESPECIAL2,
    Pais.BELIEVERS
  ]

  private scrollRefs: HTMLElement[] = [];

  getScrollRefs(index: number): HTMLElement{
    return this.scrollRefs[index];
  }

  addScrollRefs(ref: HTMLElement){
    this.scrollRefs.push(ref);
  }

  deleteScrollRef(index: number){
    this.scrollRefs.slice(index);
  }

  reseteScrollRefs(){
    this.scrollRefs.length = 0;
  }
}
