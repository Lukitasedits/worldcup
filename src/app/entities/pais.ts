export class Pais {
  static readonly ESPECIAL = new Pais('Especial1', 'FWC', '#8c1f31', 'esp1');
  static readonly CATAR = new Pais('Catar', 'QAT', '#8c1f31', 'qa');
  static readonly ECUADOR = new Pais('Ecuador', 'ECU', '#effc2d', 'ec');
  static readonly SENEGAL = new Pais('Senegal', 'SEN', '#6ab06e', 'sn');
  static readonly HOLANDA = new Pais('Holanda', 'NED', '#de5907', 'nl');
  static readonly INGLATERRA = new Pais('Inglaterra', 'ENG', '#c4c4c4', 'gb-eng');
  static readonly IRAN = new Pais('Iran', 'IRN', '#007d36', 'ir');
  static readonly EEUU = new Pais('Estados Unidos', 'USA', '#cfcfcf', 'us');
  static readonly GALES = new Pais('Gales', 'WAL', '#0d9448', 'gb-wls');
  static readonly ARGENTINA = new Pais('Argentina', 'ARG', '#69d6e0', 'ar');
  static readonly ARABIA = new Pais('Arabia Saudita', 'KSA', '#064a25', 'sa');
  static readonly MEXICO = new Pais('Mexico', 'MEX', '#083d20', 'mx');
  static readonly POLONIA = new Pais('Polonia', 'POL', '#b50424', 'pl');
  static readonly FRANCIA = new Pais('Francia', 'FRA', '#3d38c2', 'fr');
  static readonly AUSTRALIA = new Pais('Australia', 'AUS', '#c2bb38', 'au');
  static readonly DINAMARCA = new Pais('Dinamarca', 'DEN', '#bf3b3b', 'dk');
  static readonly TUNEZ = new Pais('Tunez', 'TUN', '#cf2323', 'tn');
  static readonly ESPAÑA = new Pais('España', 'ESP', '#e80202', 'es');
  static readonly COSTARICA = new Pais('Costa Rica', 'CRC', '#b83d3d', 'cr');
  static readonly ALEMANIA = new Pais('Alemania', 'ALE', '#302e2e', 'de');
  static readonly JAPON = new Pais('Japon', 'JPN', '#3854a1', 'jp');
  static readonly BELGICA = new Pais('Belgica', 'BEL', '#ba000c', 'be');
  static readonly CANADA = new Pais('Canada', 'CAN', '#ba000c', 'ca');
  static readonly MARRUECOS = new Pais('Marruecos', 'MAR', '#a32929', 'ma');
  static readonly CROACIA = new Pais('Croacia', 'CRO', '#9c1c1c', 'hr');
  static readonly BRASIL = new Pais('Brasil', 'BRA', '#0e5e07', 'br');
  static readonly SERBIA = new Pais('Serbia', 'SRB', '#6e3439', 'rs');
  static readonly SUIZA = new Pais('Suiza', 'SUI', '#a61c2a', 'ch');
  static readonly CAMERUN = new Pais('Camerún', 'CMR', '#08571e', 'cm');
  static readonly PORTUGAL = new Pais('Portugal', 'POR', '#08571e', 'pt');
  static readonly GHANA = new Pais('Ghana', 'GHA', '#9c9c9c', 'gh');
  static readonly URUGUAY = new Pais('Uruguay', 'URU', '#0a98cc', 'uy');
  static readonly COREA = new Pais('Corea del Sur', 'KOR', '#00028a', 'kr');
  static readonly ESPECIAL2 = new Pais('Especial', 'FWC', '#8c1f31', 'esp2');
  static readonly BELIEVERS = new Pais('Team Believers', 'C', '#ba0016', 'coc');

  constructor(private nombre: string, private abreviatura: string, private color: string, private bandera: string){}

  toString(){
    return this.nombre + ' (' + this.abreviatura + ')';
  }

  getNombre(){
    return this.nombre;
  }

  getAbreviatura(){
    return this.abreviatura;
  }

  getColor(){
    return this.color;
  }

  getBandera(){
    return this.bandera;
  }

}


