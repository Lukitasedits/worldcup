import { Pais } from "./pais";

export class Figurita {
  static generalID:number = 0;
  private id:number;
  private codigo: Number;
  private nombre: string
  private pais: Pais;
  private horizontal: boolean
  private doble: boolean;
  private obtenida: boolean = false;

  constructor(codigo: Number, nombre: string, pais: Pais, horizontal?: boolean, doble?:boolean, id?:number){
    this.id = id ?? Figurita.generalID++;
    this.codigo = codigo;
    this.nombre = nombre;
    this.pais = pais;
    this.horizontal = horizontal ?? false;
    this.doble = doble ?? false;
  }

  toString(){
    return this.nombre;
  }

  getId():number{
    return this.id;
  }

  getCodigo(){
    return this.codigo;
  }

  getNombre(){
    return this.nombre;
  }

  getPais(){
    return this.pais;
  }

  isHorizontal(){
    return this.horizontal;
  }

  isDoble(){
    return this.doble;
  }

  isObtenida():boolean{
    return this.obtenida;
  }

}
