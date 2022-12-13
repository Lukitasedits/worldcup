import { LoginService } from './login.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuariosService } from './usuarios.service';
import { Figurita } from './../entities/figurita';
import { Injectable } from '@angular/core';
import { Pais } from '../entities/pais';
import { FiguritaUsuario } from '../entities/figurita-usuario';
import { Usuario } from '../entities/usuario';

@Injectable({
  providedIn: 'root'
})
export class FiguritaService {

  constructor(private usuariosService: UsuariosService, private http: HttpClient, private loginService: LoginService) {
  }

  private endPoint: string = 'http://localhost:8080/usuarios/';

  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  sumarFigurita(figurita: Figurita){
    this.loginService.getUser().subscribe(user => { //utilizo este método para tener la información del username
      this.http.post(this.endPoint.concat(user.username).concat('/').concat(figurita.getId().toString()), {headers: this.httpHeaders}).subscribe( a =>{ //con el username y el id de la figurita sumo cantidad directo en la tabla
        //entro al subscribe y no utilizo el objeto solo para que funcione de forma continua
        this.loginService.getCurrentUser().subscribe( currentUser => { //extraigo el usuario actualizado
          this.loginService.setUser(currentUser); //actualizo el usuario del storage con el usuario actualizado
        })
      });
    })
  }

  restarFigurita(figurita: Figurita){
    this.loginService.getUser().subscribe(user => { //utilizo este método para tener la información del username
      this.http.delete(this.endPoint.concat(user.username).concat('/').concat(figurita.getId().toString()), {headers: this.httpHeaders}).subscribe( a =>{ //con el username y el id de la figurita sumo cantidad directo en la tabla
        //entro al subscribe y no utilizo el objeto solo para que funcione de forma continua
        this.loginService.getCurrentUser().subscribe( currentUser => { //extraigo el usuario actualizado
          this.loginService.setUser(currentUser); //actualizo el usuario del storage con el usuario actualizado
        })
      });
    })
  }

  getFiguritasUsuario():Observable<FiguritaUsuario[]>{
    this.loginService.getUser().subscribe(user => {
      return this.http.get<FiguritaUsuario[]>(this.endPoint.concat('figuritas/').concat(user.username));
    });
    return of(new Array<FiguritaUsuario>())
  }

   static almacenInternoFiguritas: Figurita[] = [];

  static getFromAlmacenInterno(id: number): Figurita{
    let indicePais: number = 0;
    let indiceFigurita: number = 0;
    FiguritaService.figuritas.forEach(
      (pais, i) => {
        let encontrado: boolean = false;
        pais.forEach(async (figurita, i) =>{
          if(figurita.getId() == id){
            indiceFigurita = i;
            encontrado = true;
          }
        }
        )
        if(encontrado)
         indicePais = i;
      }
    );
    return FiguritaService.figuritas[indicePais][indiceFigurita];
   }




   static readonly figuritas: Array<Array<Figurita>> = [

     [
    //Especiales
    new Figurita(0, 'PANINI', Pais.ESPECIAL, true),
    new Figurita(1, 'FIFA', Pais.ESPECIAL, true),
    new Figurita (2, 'COPA1', Pais.ESPECIAL, true, true),
    new Figurita (3, 'COPA2', Pais.ESPECIAL, true, true),
    new Figurita (4, 'MASCOTA1', Pais.ESPECIAL, true, true),
    new Figurita (5, 'MASCOTA2', Pais.ESPECIAL, true, true),
    new Figurita (6, 'LOGO1', Pais.ESPECIAL, true, true),
    new Figurita (7, 'LOGO2', Pais.ESPECIAL, true, true),
    new Figurita (8, 'ESTADIO1', Pais.ESPECIAL, true),
    new Figurita (9, 'ESTADIO2', Pais.ESPECIAL, true),
    new Figurita (10, 'ESTADIO3', Pais.ESPECIAL, true),
    new Figurita (11, 'ESTADIO4', Pais.ESPECIAL, true),
    new Figurita (12, 'ESTADIO5', Pais.ESPECIAL, true),
    new Figurita (13, 'ESTADIO6', Pais.ESPECIAL, true),
    new Figurita (14, 'ESTADIO7', Pais.ESPECIAL, true),
    new Figurita (15, 'ESTADIO8', Pais.ESPECIAL, true),
    new Figurita (16, 'ESTADIO9', Pais.ESPECIAL, true),
    new Figurita (17, 'ESTADIO10', Pais.ESPECIAL, true),
    new Figurita (18, 'PELOTA', Pais.ESPECIAL, false)
  ],

    [
    //Catar
    new Figurita (1, 'ESCUDO', Pais.CATAR),
    new Figurita (2, 'SAAD AL SHHE', Pais.CATAR),
    new Figurita (3, 'MESHAAL BARSHAM', Pais.CATAR),
    new Figurita (4, 'HOMAN AHMED', Pais.CATAR),
    new Figurita (5, 'BASSAM ALRAWI', Pais.CATAR),
    new Figurita (6, 'ABDULKARIM HASSAN', Pais.CATAR),
    new Figurita (7, 'MUSAAB KHIDIR', Pais.CATAR),
    new Figurita (8, 'BOUALEM KHOUKHI', Pais.CATAR),
    new Figurita (9, 'PEDRO MIGUEL', Pais.CATAR),
    new Figurita (10, 'TAREK SALMAN', Pais.CATAR),
    new Figurita (11, 'KARIM BOUDIAF', Pais.CATAR),
    new Figurita (12, 'ABDULAZIZ HATEM', Pais.CATAR),
    new Figurita (13, 'ASSIM OMER MADIBO', Pais.CATAR),
    new Figurita (14, 'YOUSUF ABDURISAG', Pais.CATAR),
    new Figurita (15, 'AKRAM HASSAN AFIF', Pais.CATAR),
    new Figurita (16, 'AHMAD ADLAAELDIN', Pais.CATAR),
    new Figurita (17, 'HASAN AL-HAYDOS', Pais.CATAR),
    new Figurita (18, 'ALMOEZ ALI', Pais.CATAR),
    new Figurita (19, 'MOHAMMED MUNTARI', Pais.CATAR),
   ],

    [
    //Ecuador
    new Figurita (1, 'ESCUDO', Pais.ECUADOR),
    new Figurita (2, 'HERNÁN GALÍNDEZ', Pais.ECUADOR),
    new Figurita (3, 'ALEXANDER DOMÍNGUEZ', Pais.ECUADOR),
    new Figurita (4, 'ROBERT ARBOLEDA', Pais.ECUADOR),
    new Figurita (5, 'BYRON CASTILLO', Pais.ECUADOR),
    new Figurita (6, 'PERVIS ESTUPIÑÁN', Pais.ECUADOR),
    new Figurita (7, 'PIERO HINCAPIÉ', Pais.ECUADOR),
    new Figurita (8, 'ÁNGELO PRECIADO', Pais.ECUADOR),
    new Figurita (9, 'FÉLIX TORRES', Pais.ECUADOR),
    new Figurita (10, 'MOISÉS CAICEDO', Pais.ECUADOR),
    new Figurita (11, 'ALAN FRANCO', Pais.ECUADOR),
    new Figurita (12, 'CARLOS GRUEZO', Pais.ECUADOR),
    new Figurita (13, 'JHEGSON MÉNDEZ', Pais.ECUADOR),
    new Figurita (14, 'JEREMY SARMIENTO', Pais.ECUADOR),
    new Figurita (15, 'MICHAEL ESTRADA', Pais.ECUADOR),
    new Figurita (16, 'ÁNGEL MENA', Pais.ECUADOR),
    new Figurita (17, 'GONZALO PLATA', Pais.ECUADOR),
    new Figurita (18, 'AYRTON PRECIADO', Pais.ECUADOR),
    new Figurita (19, 'ENNER VALENCIA', Pais.ECUADOR),
    ],

    [
    //Senegal
    new Figurita (1, 'ESCUDO', Pais.SENEGAL),
    new Figurita (2, 'ÉDOUARD MENDY', Pais.SENEGAL),
    new Figurita (3, 'ALFRED GOMIS', Pais.SENEGAL),
    new Figurita (4, 'SALIOU CISS', Pais.SENEGAL),
    new Figurita (5, 'PAPE ABOU CISSÉ', Pais.SENEGAL),
    new Figurita (6, 'ABDOU DIALLO', Pais.SENEGAL),
    new Figurita (7, 'KALIDOU KOULIBALY', Pais.SENEGAL),
    new Figurita (8, 'IBRAHIMA MBAYE', Pais.SENEGAL),
    new Figurita (9, 'BOUNA SARR', Pais.SENEGAL),
    new Figurita (10, 'KRÉPIN DIATTA', Pais.SENEGAL),
    new Figurita (11, 'IDRISSA GUEYE', Pais.SENEGAL),
    new Figurita (12, 'PAPE GUEYE', Pais.SENEGAL),
    new Figurita (13, 'CHEIKHOU KOUYATÉ', Pais.SENEGAL),
    new Figurita (14, 'NAMPALYS MENDY', Pais.SENEGAL),
    new Figurita (15, 'BOULAYE DIA', Pais.SENEGAL),
    new Figurita (16, 'FAMARA DIÉDHIOU', Pais.SENEGAL),
    new Figurita (17, 'BAMBA DIENG', Pais.SENEGAL),
    new Figurita (18, 'SADIO MANÉ', Pais.SENEGAL),
    new Figurita (19, 'ISMAÏLA SARR', Pais.SENEGAL),
    ],

    [
    //Holanda
    new Figurita (1, 'ESCUDO', Pais.HOLANDA),
    new Figurita (2, 'JUSTIN BIJLOW', Pais.HOLANDA),
    new Figurita (3, 'JASPER CILLESSEN', Pais.HOLANDA),
    new Figurita (4, 'DALEY BLIND', Pais.HOLANDA),
    new Figurita (5, 'MATTHIJS DE LIGT', Pais.HOLANDA),
    new Figurita (6, 'STEFAN DE VRIJ', Pais.HOLANDA),
    new Figurita (7, 'DENZEL DUMFRIES', Pais.HOLANDA),
    new Figurita (8, 'VIRGIL VAN DIJK', Pais.HOLANDA),
    new Figurita (9, 'STEVEN BERGHUIS', Pais.HOLANDA),
    new Figurita (10, 'FRENKIE DE JONG', Pais.HOLANDA),
    new Figurita (11, 'RYAN GRAVENBERCH', Pais.HOLANDA),
    new Figurita (12, 'DAVY KLAASSEN', Pais.HOLANDA),
    new Figurita (13, 'TEUN KOOPMEINERS', Pais.HOLANDA),
    new Figurita (14, 'GEORGINIO WIJNALDUM', Pais.HOLANDA),
    new Figurita (15, 'STEVEN BERGWIJN', Pais.HOLANDA),
    new Figurita (16, 'ARNAUT DANJUMA', Pais.HOLANDA),
    new Figurita (17, 'MEMPHIS DEPAY', Pais.HOLANDA),
    new Figurita (18, 'CODY GAKPO', Pais.HOLANDA),
    new Figurita (19, 'DONYELL MALEN', Pais.HOLANDA),
    ],

    [
    //Inglaterra
    new Figurita (1, 'ESCUDO', Pais.INGLATERRA),
    new Figurita (2, 'JORDAN PICKFORD', Pais.INGLATERRA),
    new Figurita (3, 'AARON RAMSDALE', Pais.INGLATERRA),
    new Figurita (4, 'TRENT ALEXANDER-ARNOLD', Pais.INGLATERRA),
    new Figurita (5, 'CONOR COADY', Pais.INGLATERRA),
    new Figurita (6, 'HARRY MAGUIRE', Pais.INGLATERRA),
    new Figurita (7, 'LUKE SHAW', Pais.INGLATERRA),
    new Figurita (8, 'JOHN STONES', Pais.INGLATERRA),
    new Figurita (9, 'HYLE WALKER', Pais.INGLATERRA),
    new Figurita (10, 'JUDE BELLINGHAM', Pais.INGLATERRA),
    new Figurita (11, 'JACK GREALISH', Pais.INGLATERRA),
    new Figurita (12, 'JORDAN HENDERSON', Pais.INGLATERRA),
    new Figurita (13, 'MASON MOUNT', Pais.INGLATERRA),
    new Figurita (14, 'KALVIN PHILLIPS', Pais.INGLATERRA),
    new Figurita (15, 'DECLAN RICE', Pais.INGLATERRA),
    new Figurita (16, 'PHIL FODEN', Pais.INGLATERRA),
    new Figurita (17, 'HARRY KANE', Pais.INGLATERRA),
    new Figurita (18, 'BUKAYO SAKA', Pais.INGLATERRA),
    new Figurita (19, 'RAHEEM STERLING', Pais.INGLATERRA),
    ],

    [
    //Irán
    new Figurita (1, 'ESCUDO', Pais.IRAN),
    new Figurita (2, 'AMIR ABEDZADEH', Pais.IRAN),
    new Figurita (3, 'ALIREZA BEIRANVAND', Pais.IRAN),
    new Figurita (4, 'EHSAN HAJSAFI', Pais.IRAN),
    new Figurita (5, 'MAJID HOSSEINI', Pais.IRAN),
    new Figurita (6, 'HOSSEIN KANAANI', Pais.IRAN),
    new Figurita (7, 'SHOJA KHALILZADEH', Pais.IRAN),
    new Figurita (8, 'MILAD MOHAMMADI', Pais.IRAN),
    new Figurita (9, 'SADEGH MOHARRAMI', Pais.IRAN),
    new Figurita (10, 'OMID NOORAFKAN', Pais.IRAN),
    new Figurita (11, 'VAHID AMIRI', Pais.IRAN),
    new Figurita (12, 'SAEID EZAROLAHI', Pais.IRAN),
    new Figurita (13, 'ALI HOLIZADEH', Pais.IRAN),
    new Figurita (14, 'ALIREZA JAHANBAKHSH', Pais.IRAN),
    new Figurita (15, 'AHMAD NOUROLLAHI', Pais.IRAN),
    new Figurita (16, 'KARIM ANSARIFARD', Pais.IRAN),
    new Figurita (17, 'SARDAR AZMOUN', Pais.IRAN),
    new Figurita (18, 'SAMAN GHODDOS', Pais.IRAN),
    new Figurita (19, 'MEHDI TAREMI', Pais.IRAN),
    ],

    [
    //Estados Unidos
    new Figurita (1, 'ESCUDO', Pais.EEUU),
    new Figurita (2, 'MATT TURNER', Pais.EEUU),
    new Figurita (3, 'ZACK STEFFEN', Pais.EEUU),
    new Figurita (4, 'SERGIÑO DEST', Pais.EEUU),
    new Figurita (5, 'AARON LONG', Pais.EEUU),
    new Figurita (6, 'CHRIS RICHARDS', Pais.EEUU),
    new Figurita (7, 'ANTONEE ROBINSON', Pais.EEUU),
    new Figurita (8, 'DEANDRE YEDLIN', Pais.EEUU),
    new Figurita (9, 'WALKER ZIMMERMAN', Pais.EEUU),
    new Figurita (10, 'BRENDEN AARONSON', Pais.EEUU),
    new Figurita (11, 'KELLYN ACOSTA', Pais.EEUU),
    new Figurita (12, 'TYLER ADAMS', Pais.EEUU),
    new Figurita (13, 'WESTON MCKENNIE', Pais.EEUU),
    new Figurita (14, 'YONUS MUSAH', Pais.EEUU),
    new Figurita (15, 'JESÚS FERREIRA', Pais.EEUU),
    new Figurita (16, 'RICARDO PEPI', Pais.EEUU),
    new Figurita (17, 'CHRISTIAN PULISIC', Pais.EEUU),
    new Figurita (18, 'GIOVANNI REYNA', Pais.EEUU),
    new Figurita (19, 'TIMOTHY WEAH', Pais.EEUU),
    ],

    [
    //Gales
    new Figurita (1, 'ESCUDO', Pais.GALES),
    new Figurita (2, 'DANNY WARD', Pais.GALES),
    new Figurita (3, 'WAYNE HENNESSEY', Pais.GALES),
    new Figurita (4, 'ETHAN AMPADU', Pais.GALES),
    new Figurita (5, 'BEN DAVIES', Pais.GALES),
    new Figurita (6, 'CHRIS GUNTER', Pais.GALES),
    new Figurita (7, 'CHRIS MEPHAN', Pais.GALES),
    new Figurita (8, 'CONNOR ROBERTS', Pais.GALES),
    new Figurita (9, 'JOE RODON', Pais.GALES),
    new Figurita (10, 'NECO WILLIAMS', Pais.GALES),
    new Figurita (11, 'JOE ALLEN', Pais.GALES),
    new Figurita (12, 'JOE MORRELL', Pais.GALES),
    new Figurita (13, 'AARON RAMSEY', Pais.GALES),
    new Figurita (14, 'JONATHAN WILLIAMS', Pais.GALES),
    new Figurita (15, 'HARRY WILSON', Pais.GALES),
    new Figurita (16, 'GARETH BALE', Pais.GALES),
    new Figurita (17, 'DANIELS JAMES', Pais.GALES),
    new Figurita (18, 'BRENNAN JOHNSON', Pais.GALES),
    new Figurita (19, 'KIEFFER MOORE', Pais.GALES),
    ],

    [
    //Argentina
    new Figurita (1, 'ESCUDO', Pais.ARGENTINA),
    new Figurita (2, 'EMILIANO MARTÍNEZ', Pais.ARGENTINA),
    new Figurita (3, 'FRANCO ARMANI', Pais.ARGENTINA),
    new Figurita (4, 'MARCOS ACUÑA', Pais.ARGENTINA),
    new Figurita (5, 'NAHUEL MOLINA', Pais.ARGENTINA),
    new Figurita (6, 'NICOLÁS OTAMENDI', Pais.ARGENTINA),
    new Figurita (7, 'GERMÁN PEZZELLA', Pais.ARGENTINA),
    new Figurita (8, 'CRISTIAN ROMERO', Pais.ARGENTINA),
    new Figurita (9, 'RODRIGO DE PAUL', Pais.ARGENTINA),
    new Figurita (10, 'ÁNGEL DI MARÍA', Pais.ARGENTINA),
    new Figurita (11, 'GIOVANI LO CELSO', Pais.ARGENTINA),
    new Figurita (12, 'LEANDRO PAREDES', Pais.ARGENTINA),
    new Figurita (13, 'GUIDO RODRÍGUEZ', Pais.ARGENTINA),
    new Figurita (14, 'JULIÁN ÁLVAREZ', Pais.ARGENTINA),
    new Figurita (15, 'JOAQUÍN CORREA', Pais.ARGENTINA),
    new Figurita (16, 'ALEJANDRO GÓMEZ', Pais.ARGENTINA),
    new Figurita (17, 'NICOLÁS GONZÁLEZ', Pais.ARGENTINA),
    new Figurita (18, 'LAUTARO MARTÍNEZ', Pais.ARGENTINA),
    new Figurita (19, 'LIONEL MESSI', Pais.ARGENTINA),
    ],

    [
    //Arabia Saudita
    new Figurita (1, 'ESCUDO', Pais.ARABIA),
    new Figurita (2, 'MOHAMMED AL-OWAIS', Pais.ARABIA),
    new Figurita (3, 'MOHAMMED AL-RUBAIE', Pais.ARABIA),
    new Figurita (4, 'ABDULELAH AL-AMRI', Pais.ARABIA),
    new Figurita (5, 'ALI AL-BOLEAHI', Pais.ARABIA),
    new Figurita (6, 'MOHAMMED AL-BURAYK', Pais.ARABIA),
    new Figurita (7, 'SULTAN AL-GHANNAM', Pais.ARABIA),
    new Figurita (8, 'YASSER AL-SHAHRANI', Pais.ARABIA),
    new Figurita (9, 'HASSAN AL-TAMBAKTI', Pais.ARABIA),
    new Figurita (10, 'ABDULLAH MADU', Pais.ARABIA),
    new Figurita (11, 'SALMAN AL-FARAJ', Pais.ARABIA),
    new Figurita (12, 'ABDULELAH AL-MALKI', Pais.ARABIA),
    new Figurita (13, 'SAMI AL-NAJEI', Pais.ARABIA),
    new Figurita (14, 'HATTAN BAHEBRI', Pais.ARABIA),
    new Figurita (15, 'MOHAMED KANNO', Pais.ARABIA),
    new Figurita (16, 'ABDULLAH OTAYF', Pais.ARABIA),
    new Figurita (17, 'FIRAS AL-BURAIKAN', Pais.ARABIA),
    new Figurita (18, 'SALEM AL-DAWSARI', Pais.ARABIA),
    new Figurita (19, 'KHALID AL-GHANNAM', Pais.ARABIA),
    ],

    [
    //México
    new Figurita (1, 'ESCUDO', Pais.MEXICO),
    new Figurita (2, 'GUILLERMO OCHOA', Pais.MEXICO),
    new Figurita (3, 'ALFREDO TALAVERA', Pais.MEXICO),
    new Figurita (4, 'NÉSTOR ARAÚJO', Pais.MEXICO),
    new Figurita (5, 'JESÚS GALLARDO', Pais.MEXICO),
    new Figurita (6, 'CÉSAR MONTES', Pais.MEXICO),
    new Figurita (7, 'HECTOR MORENO', Pais.MEXICO),
    new Figurita (8, 'LUIS ROMO', Pais.MEXICO),
    new Figurita (9, 'JORGE SÁNCHEZ', Pais.MEXICO),
    new Figurita (10, 'EDSON ÁLVAREZ', Pais.MEXICO),
    new Figurita (11, 'JESÚS MANUEL CORONA', Pais.MEXICO),
    new Figurita (12, 'ANDRÉS GUARDADO', Pais.MEXICO),
    new Figurita (13, 'ÉRICK GUTIÉRREZ', Pais.MEXICO),
    new Figurita (14, 'HÉCTOR HERRERA', Pais.MEXICO),
    new Figurita (15, 'DIEGO LAINEZ', Pais.MEXICO),
    new Figurita (16, 'CARLOS RODRÍGUEZ', Pais.MEXICO),
    new Figurita (17, 'ROGELIO FUNES MORI', Pais.MEXICO),
    new Figurita (18, 'RAÚL JIMÉNEZ', Pais.MEXICO),
    new Figurita (19, 'HIRVING LOZANO', Pais.MEXICO),
    ],

    [
    //Polonia
    new Figurita (1, 'ESCUDO', Pais.POLONIA),
    new Figurita (2, 'WOJCIECH SZCZĘSNY', Pais.POLONIA),
    new Figurita (3, 'ŁUKASZ SKORUPSKI', Pais.POLONIA),
    new Figurita (4, 'JAN BEDNAREK', Pais.POLONIA),
    new Figurita (5, 'BARTOSZ BERESZYŃSKI', Pais.POLONIA),
    new Figurita (6, 'MATTY CASH', Pais.POLONIA),
    new Figurita (7, 'KAMIL GLIK', Pais.POLONIA),
    new Figurita (8, 'TYMOTEUSZ PUCHACZ', Pais.POLONIA),
    new Figurita (9, 'MACIEJ RYBUS', Pais.POLONIA),
    new Figurita (10, 'KAMIL JÓŹWIAK', Pais.POLONIA),
    new Figurita (11, 'MATEUSZ KLICH', Pais.POLONIA),
    new Figurita (12, 'GRZEGORZ KRYCHOWIAK', Pais.POLONIA),
    new Figurita (13, 'JAKUB MODER', Pais.POLONIA),
    new Figurita (14, 'SEBASTIAN SZYMAŃSKI', Pais.POLONIA),
    new Figurita (15, 'PIOTR ZIELIŃSKI', Pais.POLONIA),
    new Figurita (16, 'ROBERT LEWANDOWSKI', Pais.POLONIA),
    new Figurita (17, 'ARKADIUSZ MILIK', Pais.POLONIA),
    new Figurita (18, 'KRZYSZTOF PIĄTEK', Pais.POLONIA),
    new Figurita (19, 'KAROL ŚWIDERSKI', Pais.POLONIA),
    ],

    [
    //Francia
    new Figurita (1, 'ESCUDO', Pais.FRANCIA),
    new Figurita (2, 'HUGO LLORIS', Pais.FRANCIA),
    new Figurita (3, 'MIKE MAIGNAN', Pais.FRANCIA),
    new Figurita (4, 'LUCAS HERNÁNDEZ', Pais.FRANCIA),
    new Figurita (5, 'THEO HERNÁNDEZ', Pais.FRANCIA),
    new Figurita (6, 'PRESNEL KIMPEMBE', Pais.FRANCIA),
    new Figurita (7, 'JULES KOUNDÉ', Pais.FRANCIA),
    new Figurita (8, 'BENJAMIN PAVARD', Pais.FRANCIA),
    new Figurita (9, 'RAPHAËL VARANE', Pais.FRANCIA),
    new Figurita (10, "N'GOLO KANTÉ", Pais.FRANCIA),
    new Figurita (11, 'PAUL POGBA', Pais.FRANCIA),
    new Figurita (12, 'ADRIEN RABIOT', Pais.FRANCIA),
    new Figurita (13, 'AURÉLIEN RCHOUAMÉNI', Pais.FRANCIA),
    new Figurita (14, 'WISSAM BEN YEDDER', Pais.FRANCIA),
    new Figurita (15, 'KARIM BENZEMA', Pais.FRANCIA),
    new Figurita (16, 'KINGSLEY COMAN', Pais.FRANCIA),
    new Figurita (17, 'ANTOINE GRIEZMANN', Pais.FRANCIA),
    new Figurita (18, 'KYLIAN MBAPPÉ', Pais.FRANCIA),
    new Figurita (19, 'CHRISTOPHER NKUNKU', Pais.FRANCIA),
    ],

    [
    //Australia
    new Figurita (1, 'ESCUDO', Pais.AUSTRALIA),
    new Figurita (2, 'MATHEW RYAN', Pais.AUSTRALIA),
    new Figurita (3, 'ANDREW REDWAYNE', Pais.AUSTRALIA),
    new Figurita (4, 'AZIZ BEHICH', Pais.AUSTRALIA),
    new Figurita (5, 'MILOŠ DEGENEK', Pais.AUSTRALIA),
    new Figurita (6, 'RHYAN GRANT', Pais.AUSTRALIA),
    new Figurita (7, 'JOEL KING', Pais.AUSTRALIA),
    new Figurita (8, 'TRENT SAINSBURY', Pais.AUSTRALIA),
    new Figurita (9, 'HARRY SOUTTAR', Pais.AUSTRALIA),
    new Figurita (10, 'AJDIN HRUSTIĆ', Pais.AUSTRALIA),
    new Figurita (11, 'JACKSON IRVINE', Pais.AUSTRALIA),
    new Figurita (12, 'JAMES JEGGO', Pais.AUSTRALIA),
    new Figurita (13, 'AWER MABIL', Pais.AUSTRALIA),
    new Figurita (14, 'AARON MOOY', Pais.AUSTRALIA),
    new Figurita (15, 'MARTIN BOYLE', Pais.AUSTRALIA),
    new Figurita (16, 'MITCHELL DUKE', Pais.AUSTRALIA),
    new Figurita (17, 'CRAIG GOODWIN', Pais.AUSTRALIA),
    new Figurita (18, 'MATHEW LECKIE', Pais.AUSTRALIA),
    new Figurita (19, 'ADAM TAGGART', Pais.AUSTRALIA),
    ],

    [
    //Dinamarca
    new Figurita (1, 'ESCUDO', Pais.DINAMARCA),
    new Figurita (2, 'KASPER SCHMEICHEL', Pais.DINAMARCA),
    new Figurita (3, 'FREDERIK RØNNOW', Pais.DINAMARCA),
    new Figurita (4, 'ANDREAS CRISTENSEN', Pais.DINAMARCA),
    new Figurita (5, 'SIMON KJÆR', Pais.DINAMARCA),
    new Figurita (6, 'JOAKIM MÆHLE', Pais.DINAMARCA),
    new Figurita (7, 'JENS STRYGER LARSEN', Pais.DINAMARCA),
    new Figurita (8, 'JANNIK VESTERGAARD', Pais.DINAMARCA),
    new Figurita (9, 'MIKKEL DAMSGAARD', Pais.DINAMARCA),
    new Figurita (10, 'THOMAS DELANEY', Pais.DINAMARCA),
    new Figurita (11, 'CHRISTIAN ERIKSEN', Pais.DINAMARCA),
    new Figurita (12, 'PIERRE EMILE HØJBJERG', Pais.DINAMARCA),
    new Figurita (13, 'CHRISTIAN NØRGAARD', Pais.DINAMARCA),
    new Figurita (14, 'DANIEL WASS', Pais.DINAMARCA),
    new Figurita (15, 'MARTIN BRAITHWAITE', Pais.DINAMARCA),
    new Figurita (16, 'KASPER DOLBERG', Pais.DINAMARCA),
    new Figurita (17, 'YUSSUF POULSEN', Pais.DINAMARCA),
    new Figurita (18, 'ANDREAS SKOV OLSEN', Pais.DINAMARCA),
    new Figurita (19, 'JONAS WIND', Pais.DINAMARCA),
    ],

    [
    //Túnez
    new Figurita (1, 'ESCUDO', Pais.TUNEZ),
    new Figurita (2, 'BECHIR BEN SAÏD', Pais.TUNEZ),
    new Figurita (3, 'FAROUK BEN MUSTAPHA', Pais.TUNEZ),
    new Figurita (4, 'DYLAN BRONN', Pais.TUNEZ),
    new Figurita (5, 'MOHAMED DRÄGER', Pais.TUNEZ),
    new Figurita (6, 'BILEL IFA', Pais.TUNEZ),
    new Figurita (7, 'ALI MAÂLOUL', Pais.TUNEZ),
    new Figurita (8, 'HAMZA MATHLOUTHI', Pais.TUNEZ),
    new Figurita (9, 'YASSINE MERIAH', Pais.TUNEZ),
    new Figurita (10, 'MONTASSAR TALBI', Pais.TUNEZ),
    new Figurita (11, 'MOHAMED ALI BEN ROMDHANE', Pais.TUNEZ),
    new Figurita (12, 'WAHBI KHAZRI', Pais.TUNEZ),
    new Figurita (13, 'AÏSSA LAÏDOUNI', Pais.TUNEZ),
    new Figurita (14, 'FERJANI SASSI', Pais.TUNEZ),
    new Figurita (15, 'ELLYES SKHIRI', Pais.TUNEZ),
    new Figurita (16, 'ANIS SLIMANE', Pais.TUNEZ),
    new Figurita (17, 'SEIFEDDINE JAZIRI', Pais.TUNEZ),
    new Figurita (18, 'YOUSSEF MSAKNI', Pais.TUNEZ),
    new Figurita (19, 'NAÏM SLITI', Pais.TUNEZ),
    ],

    [
    //España
    new Figurita (1, 'ESCUDO', Pais.ESPAÑA),
    new Figurita (2, 'UNAI SIMÓN', Pais.ESPAÑA),
    new Figurita (3, 'ROBERT SÁNCHEZ', Pais.ESPAÑA),
    new Figurita (4, 'CÉSAR AZPILICUETA', Pais.ESPAÑA),
    new Figurita (5, 'ERIC GARCÍA', Pais.ESPAÑA),
    new Figurita (6, 'JORDI ALBA', Pais.ESPAÑA),
    new Figurita (7, 'AYMERIC LAPORTE', Pais.ESPAÑA),
    new Figurita (8, 'PAU TORRES', Pais.ESPAÑA),
    new Figurita (9, 'GAVI', Pais.ESPAÑA),
    new Figurita (10, 'KOKE', Pais.ESPAÑA),
    new Figurita (11, 'MARCOS LLORENTE', Pais.ESPAÑA),
    new Figurita (12, 'PEDRI', Pais.ESPAÑA),
    new Figurita (13, 'RODRI', Pais.ESPAÑA),
    new Figurita (14, 'SERGIO BUSQUETS', Pais.ESPAÑA),
    new Figurita (15, 'DANI OLMO', Pais.ESPAÑA),
    new Figurita (16, 'ANSU FATI', Pais.ESPAÑA),
    new Figurita (17, 'FERRAN TORRES', Pais.ESPAÑA),
    new Figurita (18, 'ÁLVARO MORATA', Pais.ESPAÑA),
    new Figurita (19, 'PABLO SARABIA', Pais.ESPAÑA),
    ],

    [
    //Costa Rica
    new Figurita (1, 'ESCUDO', Pais.COSTARICA),
    new Figurita (2, 'KEYLOR NAVAS', Pais.COSTARICA),
    new Figurita (3, 'LEONEL MOREIRA', Pais.COSTARICA),
    new Figurita (4, 'RICARDO BLANCO', Pais.COSTARICA),
    new Figurita (5, 'FRANCISCO CALVO', Pais.COSTARICA),
    new Figurita (6, 'ÓSCAR DUARTE', Pais.COSTARICA),
    new Figurita (7, 'KEYSHER FULLER', Pais.COSTARICA),
    new Figurita (8, 'BRYAN OVIEDO', Pais.COSTARICA),
    new Figurita (9, 'JUAN PABLO VARGAS', Pais.COSTARICA),
    new Figurita (10, 'KENDALL WASTON', Pais.COSTARICA),
    new Figurita (11, 'CELSO BORGES', Pais.COSTARICA),
    new Figurita (12, 'ORLANDO GALO', Pais.COSTARICA),
    new Figurita (13, 'BRYAN RUIZ', Pais.COSTARICA),
    new Figurita (14, 'YELTSIN TEJEDA', Pais.COSTARICA),
    new Figurita (15, 'JEWISON BENNETTE', Pais.COSTARICA),
    new Figurita (16, 'JOEL CAMPBELL', Pais.COSTARICA),
    new Figurita (17, 'ANTHONY CONTRERAS', Pais.COSTARICA),
    new Figurita (18, 'GERSON TORRES', Pais.COSTARICA),
    new Figurita (19, 'JOHAN VANEGAS', Pais.COSTARICA),
    ],

    [
    //Alemania
    new Figurita (1, 'ESCUDO', Pais.ALEMANIA),
    new Figurita (2, 'MANUEL NEUER', Pais.ALEMANIA),
    new Figurita (3, 'MARC-ANDRÉ TER STEGEN', Pais.ALEMANIA),
    new Figurita (4, 'MATTHIAS GINTER', Pais.ALEMANIA),
    new Figurita (5, 'ROBIN GOSENS', Pais.ALEMANIA),
    new Figurita (6, 'THILO KEHRER', Pais.ALEMANIA),
    new Figurita (7, 'DAVID RAUM', Pais.ALEMANIA),
    new Figurita (8, 'ANTONIO RÜDIGER', Pais.ALEMANIA),
    new Figurita (9, 'NIKLAS SÜLE', Pais.ALEMANIA),
    new Figurita (10, 'LEON GORETZKA', Pais.ALEMANIA),
    new Figurita (11, 'İLKAY GÜNDOĜAN', Pais.ALEMANIA),
    new Figurita (12, 'KAI HAVERTZ', Pais.ALEMANIA),
    new Figurita (13, 'JONAS HOFMANN', Pais.ALEMANIA),
    new Figurita (14, 'JOSHUA KIMMICH', Pais.ALEMANIA),
    new Figurita (15, 'SERGE GNABRY', Pais.ALEMANIA),
    new Figurita (16, 'THOMAS MÜLLER', Pais.ALEMANIA),
    new Figurita (17, 'MARCO REUS', Pais.ALEMANIA),
    new Figurita (18, 'LEROY SANÉ', Pais.ALEMANIA),
    new Figurita (19, 'TIMO WERNER', Pais.ALEMANIA),
    ],

    [
    //Japón
    new Figurita (1, 'ESCUDO', Pais.JAPON),
    new Figurita (2, 'SHUICHI GONDA', Pais.JAPON),
    new Figurita (3, 'EIJI KAWASHIMA', Pais.JAPON),
    new Figurita (4, 'YUTO NAGATOMO', Pais.JAPON),
    new Figurita (5, 'YUTA NAKAYAMA', Pais.JAPON),
    new Figurita (6, 'TAKEHIRO TOMIYASU', Pais.JAPON),
    new Figurita (7, 'MIKI YAMANE', Pais.JAPON),
    new Figurita (8, 'MAYA YOSHIDA', Pais.JAPON),
    new Figurita (9, 'WATARU ENDO', Pais.JAPON),
    new Figurita (10, 'GENKI HARAGUCHI', Pais.JAPON),
    new Figurita (11, 'HIDEMASA MORITA', Pais.JAPON),
    new Figurita (12, 'GAKU SHIBASAKI', Pais.JAPON),
    new Figurita (13, 'AO TANAKA', Pais.JAPON),
    new Figurita (14, 'TAKUMA ASANO', Pais.JAPON),
    new Figurita (15, 'KYOGO FURUHASHI', Pais.JAPON),
    new Figurita (16, 'JUNYA ITO', Pais.JAPON),
    new Figurita (17, 'TAKUMI MINAMINO', Pais.JAPON),
    new Figurita (18, 'KAORU MITOMA', Pais.JAPON),
    new Figurita (19, 'YUYA OSAKO', Pais.JAPON),
    ],

    [
    //Bélgica
    new Figurita (1, 'ESCUDO', Pais.BELGICA),
    new Figurita (2, 'THIBAUT COURTOIS', Pais.BELGICA),
    new Figurita (3, 'SIMON MIGNOLET', Pais.BELGICA),
    new Figurita (4, 'TOBY ALDERWEIRELD', Pais.BELGICA),
    new Figurita (5, 'TIMOTHY CASTAGNE', Pais.BELGICA),
    new Figurita (6, 'JASON DENAYER', Pais.BELGICA),
    new Figurita (7, 'THOMAS MEUNIER', Pais.BELGICA),
    new Figurita (8, 'JAN VERTONGHEN', Pais.BELGICA),
    new Figurita (9, 'YANNICK CARRASCO', Pais.BELGICA),
    new Figurita (10, 'KEVIN DE BRUYNE', Pais.BELGICA),
    new Figurita (11, 'CHARLES DE KETELAERE', Pais.BELGICA),
    new Figurita (12, 'THORGAN HAZARD', Pais.BELGICA),
    new Figurita (13, 'YOURI TIELEMANS', Pais.BELGICA),
    new Figurita (14, 'HANS VANAKEN', Pais.BELGICA),
    new Figurita (15, 'AXEL WITSEL', Pais.BELGICA),
    new Figurita (16, 'JÉRÉMY DOKU', Pais.BELGICA),
    new Figurita (17, 'EDEN HAZARD', Pais.BELGICA),
    new Figurita (18, 'ROMELU LUKAKU', Pais.BELGICA),
    new Figurita (19, 'DRIES MERTENS', Pais.BELGICA),
    ],

    [
    //Canadá
    new Figurita (1, 'ESCUDO', Pais.CANADA),
    new Figurita (2, 'MILAN BORJAN', Pais.CANADA),
    new Figurita (3, 'MAXIME CRÉPEAU', Pais.CANADA),
    new Figurita (4, 'SAMUEL ADEKUGBE', Pais.CANADA),
    new Figurita (5, 'DONEIL HENRY', Pais.CANADA),
    new Figurita (6, 'ALISTAIR JOHNSTON', Pais.CANADA),
    new Figurita (7, 'RICHIE LARYEA', Pais.CANADA),
    new Figurita (8, 'KAMAL MILLER', Pais.CANADA),
    new Figurita (9, 'STEVEN VOTÓRIA', Pais.CANADA),
    new Figurita (10, 'KEVIN TAJON BUCHANAN', Pais.CANADA),
    new Figurita (11, 'ALPHONSO DAVIES', Pais.CANADA),
    new Figurita (12, 'STEPHEN EUSTÁQUIO', Pais.CANADA),
    new Figurita (13, 'ATIBA HUTCHINSON', Pais.CANADA),
    new Figurita (14, 'MARK-ANTHONY KAYE', Pais.CANADA),
    new Figurita (15, 'JONATHAN OSORIO', Pais.CANADA),
    new Figurita (16, 'SAMUEL PIETTE', Pais.CANADA),
    new Figurita (17, 'JONATHAN DAVID', Pais.CANADA),
    new Figurita (18, 'DAVID JUNIOR HOILETT', Pais.CANADA),
    new Figurita (19, 'CYLE LARIN', Pais.CANADA),
    ],

    [
    //Marruecos
    new Figurita (1, 'ESCUDO', Pais.MARRUECOS),
    new Figurita (2, 'YASSINE BOUNOU', Pais.MARRUECOS),
    new Figurita (3, 'MUNIR MOHAMEDI', Pais.MARRUECOS),
    new Figurita (4, 'NAYEF AGUERD', Pais.MARRUECOS),
    new Figurita (5, 'ACHRAF HAKIMI', Pais.MARRUECOS),
    new Figurita (6, 'ADAM MASINA', Pais.MARRUECOS),
    new Figurita (7, 'SAMY MMAEE', Pais.MARRUECOS),
    new Figurita (8, 'ROMAIN SAÏSS', Pais.MARRUECOS),
    new Figurita (9, 'SELIM AMALLAH', Pais.MARRUECOS),
    new Figurita (10, 'SOFYAN AMRABAT', Pais.MARRUECOS),
    new Figurita (11, 'AYMEN BARKOK', Pais.MARRUECOS),
    new Figurita (12, 'ILIAS CHAIR', Pais.MARRUECOS),
    new Figurita (13, 'IMRÂN LOUZA', Pais.MARRUECOS),
    new Figurita (14, 'SOFIANE BOUFAL', Pais.MARRUECOS),
    new Figurita (15, 'AYOUB EL KAABI', Pais.MARRUECOS),
    new Figurita (16, 'YOUSSEF EN-NESYRI', Pais.MARRUECOS),
    new Figurita (17, 'RYAN MMAEE', Pais.MARRUECOS),
    new Figurita (18, 'MUNIR', Pais.MARRUECOS),
    new Figurita (19, 'TARIK TISSOUDALI', Pais.MARRUECOS),
    ],

    [
    //Croacia
    new Figurita (1, 'ESCUDO', Pais.CROACIA),
    new Figurita (2, 'DOMINIK LIVAKOVIĆ', Pais.CROACIA),
    new Figurita (3, 'IVICA IVUŠIĆ', Pais.CROACIA),
    new Figurita (4, 'DUJE ĆALETA-CAR', Pais.CROACIA),
    new Figurita (5, 'JOŠKO GVARDIOL', Pais.CROACIA),
    new Figurita (6, 'JOSIP JURANOVIĆ', Pais.CROACIA),
    new Figurita (7, 'DEJAN LOVREN', Pais.CROACIA),
    new Figurita (8, 'BORNA SOSA', Pais.CROACIA),
    new Figurita (9, 'DOMAGOJ VIDA', Pais.CROACIA),
    new Figurita (10, 'MARCELO BROZOVIĆ', Pais.CROACIA),
    new Figurita (11, 'MATEO KOVAČIĆ', Pais.CROACIA),
    new Figurita (12, 'LUKA MODRIĆ', Pais.CROACIA),
    new Figurita (13, 'MARIO PAŠALIĆ', Pais.CROACIA),
    new Figurita (14, 'IVAN PERIŠIĆ', Pais.CROACIA),
    new Figurita (15, 'NIKOLA VLAŠIĆ', Pais.CROACIA),
    new Figurita (16, 'JOSIP BREKALO', Pais.CROACIA),
    new Figurita (17, 'ANDREJ KRAMARIĆ', Pais.CROACIA),
    new Figurita (18, 'MARKO LIVAJA', Pais.CROACIA),
    new Figurita (19, 'MISLAV ORŠIĆ', Pais.CROACIA),
    ],

    [
    //Brasil
    new Figurita (1, 'ESCUDO', Pais.BRASIL),
    new Figurita (2, 'ALLISON', Pais.BRASIL),
    new Figurita (3, 'EDERSON', Pais.BRASIL),
    new Figurita (4, 'ALEX SANDRO', Pais.BRASIL),
    new Figurita (5, 'DANILO', Pais.BRASIL),
    new Figurita (6, 'ÉDER MILITÃO', Pais.BRASIL),
    new Figurita (7, 'MARQUINHOS', Pais.BRASIL),
    new Figurita (8, 'THIAGO SILVA', Pais.BRASIL),
    new Figurita (9, 'CASEMIRO', Pais.BRASIL),
    new Figurita (10, 'PHILIPPE COUTINHO', Pais.BRASIL),
    new Figurita (11, 'FABINHO', Pais.BRASIL),
    new Figurita (12, 'FRED', Pais.BRASIL),
    new Figurita (13, 'LUCAS PAQUETÁ', Pais.BRASIL),
    new Figurita (14, 'ANTONY', Pais.BRASIL),
    new Figurita (15, 'GABRIEL JESUS', Pais.BRASIL),
    new Figurita (16, 'NEYMAR JR', Pais.BRASIL),
    new Figurita (17, 'RAPHINHA', Pais.BRASIL),
    new Figurita (18, 'RICHARLISON', Pais.BRASIL),
    new Figurita (19, 'VINÍCIUS JR', Pais.BRASIL),
    ],

    [
    //Serbia
    new Figurita (1, 'ESCUDO', Pais.SERBIA),
    new Figurita (2, 'PREDRAG RAJKOVIĆ', Pais.SERBIA),
    new Figurita (3, 'VANJA MILINKOVIĆ-SAVIĆ', Pais.SERBIA),
    new Figurita (4, 'NIKOLA MILENKOVIĆ', Pais.SERBIA),
    new Figurita (5, 'STRAHINJA PAVLOVIĆ', Pais.SERBIA),
    new Figurita (6, 'MILOŠ VELJKOVIĆ', Pais.SERBIA),
    new Figurita (7, 'FILIP ÐURIČIĆ', Pais.SERBIA),
    new Figurita (8, 'NEMANJA GUDELJ', Pais.SERBIA),
    new Figurita (9, 'FILIP KOSTIĆ', Pais.SERBIA),
    new Figurita (10, 'DARKO LAZOVIĆ', Pais.SERBIA),
    new Figurita (11, 'SAŠA LUKIĆ', Pais.SERBIA),
    new Figurita (12, 'NEMANJA MAKSIMOVIĆ', Pais.SERBIA),
    new Figurita (19, 'SERGEJ MILINKOVIĆ-SAVIĆ', Pais.SERBIA),
    new Figurita (13, 'NEMANJA RADONJIĆ', Pais.SERBIA),
    new Figurita (14, 'ANDRIJA ŽIVKOVIĆ', Pais.SERBIA),
    new Figurita (15, 'LUKA JOVIĆ', Pais.SERBIA),
    new Figurita (16, 'ALEKSANDAR MITROVIĆ', Pais.SERBIA),
    new Figurita (17, 'DUŠAN TADIĆ', Pais.SERBIA),
    new Figurita (18, 'DUŠAN VLAHOVIĆ', Pais.SERBIA),
    ],

    [
    //Suiza
    new Figurita (1, 'ESCUDO', Pais.SUIZA),
    new Figurita (2, 'YANN SOMMER', Pais.SUIZA),
    new Figurita (3, 'GREGOR KOBEL', Pais.SUIZA),
    new Figurita (4, 'MANUEL AKANJI', Pais.SUIZA),
    new Figurita (5, 'NICO ELVEDI', Pais.SUIZA),
    new Figurita (6, 'KEVIN MBABU', Pais.SUIZA),
    new Figurita (7, 'RICARDO RODRÍGUEZ', Pais.SUIZA),
    new Figurita (8, 'FABIAN SCHÄR', Pais.SUIZA),
    new Figurita (9, 'SILVAN WIDMER', Pais.SUIZA),
    new Figurita (10, 'REMO FREULER', Pais.SUIZA),
    new Figurita (11, 'XHERDAN SHAQIRI', Pais.SUIZA),
    new Figurita (12, 'DJIBRIL SOW', Pais.SUIZA),
    new Figurita (19, 'GRANIT XHAKA', Pais.SUIZA),
    new Figurita (13, 'DENIS ZAKARIA', Pais.SUIZA),
    new Figurita (14, 'STEVEN ZUBER', Pais.SUIZA),
    new Figurita (15, 'BREEL EMBOLO', Pais.SUIZA),
    new Figurita (16, 'NOAH OKAFOR', Pais.SUIZA),
    new Figurita (17, 'HARIS SEFEROVIĆ', Pais.SUIZA),
    new Figurita (18, 'RUBEN VARGAS', Pais.SUIZA),
    ],

    [
    //Camerún
    new Figurita (1, 'ESCUDO', Pais.CAMERUN),
    new Figurita (2, 'ANDRÉ ONANA', Pais.CAMERUN),
    new Figurita (3, 'DEVIS EPASSY', Pais.CAMERUN),
    new Figurita (4, 'JEAN-CHARLES CASTELLETTO', Pais.CAMERUN),
    new Figurita (5, 'COLLINS FAI', Pais.CAMERUN),
    new Figurita (6, 'OLIVER MBAIZO', Pais.CAMERUN),
    new Figurita (7, 'HAROLD MOUKOUDI', Pais.CAMERUN),
    new Figurita (8, 'MICHAEL NGADEU', Pais.CAMERUN),
    new Figurita (9, 'NOUHOU', Pais.CAMERUN),
    new Figurita (10, 'MARTIN HONGLA', Pais.CAMERUN),
    new Figurita (11, 'PIERRE KUNDE', Pais.CAMERUN),
    new Figurita (12, 'JAMES LÉA SILIKI', Pais.CAMERUN),
    new Figurita (19, 'SAMUEL OUM GOUET', Pais.CAMERUN),
    new Figurita (13, 'ANDRÉ-FRANK ZAMBO ANGUISSA', Pais.CAMERUN),
    new Figurita (14, 'VINCENT ABOUBAKAR', Pais.CAMERUN),
    new Figurita (15, 'STÉPHANE BAHOKEN', Pais.CAMERUN),
    new Figurita (16, 'ERIC MAXIM CHOUPO-MOTIN', Pais.CAMERUN),
    new Figurita (17, 'NICOLAS MOUMI NGAMALEU', Pais.CAMERUN),
    new Figurita (18, 'KARL TOKO EKAMBI', Pais.CAMERUN),
    ],

    [
    //Portugal
    new Figurita (1, 'ESCUDO', Pais.PORTUGAL),
    new Figurita (2, 'DIOGO COSTA', Pais.PORTUGAL),
    new Figurita (3, 'RUI PATRÍCIO', Pais.PORTUGAL),
    new Figurita (4, 'JOÃO CANCELO', Pais.PORTUGAL),
    new Figurita (5, 'JOSÉ FONTE', Pais.PORTUGAL),
    new Figurita (6, 'NUNO MENDES', Pais.PORTUGAL),
    new Figurita (7, 'PEPE', Pais.PORTUGAL),
    new Figurita (8, 'RAPHAËL GUERREIRO', Pais.PORTUGAL),
    new Figurita (9, 'RÚBEN DIAS', Pais.PORTUGAL),
    new Figurita (10, 'BERNARDO SILVA', Pais.PORTUGAL),
    new Figurita (11, 'BRUNO FERNANDES', Pais.PORTUGAL),
    new Figurita (12, 'DANILO PEREIRA', Pais.PORTUGAL),
    new Figurita (19, 'JOÃO MOUTINHO', Pais.PORTUGAL),
    new Figurita (13, 'RENATO SANCHES', Pais.PORTUGAL),
    new Figurita (14, 'RÚBEN NEVES', Pais.PORTUGAL),
    new Figurita (15, 'ANDRÉ SILVA', Pais.PORTUGAL),
    new Figurita (16, 'CRISTIANO RONALDO', Pais.PORTUGAL),
    new Figurita (17, 'DIOGO JOTA', Pais.PORTUGAL),
    new Figurita (18, 'GONÇALO GUEDES', Pais.PORTUGAL),
    ],

    [
    //Ghana
    new Figurita (1, 'ESCUDO', Pais.GHANA),
    new Figurita (2, 'JOE WOLLACOTT', Pais.GHANA),
    new Figurita (3, 'RICHARD OFORI', Pais.GHANA),
    new Figurita (4, 'DANIEL AMARTEY', Pais.GHANA),
    new Figurita (5, 'ABDUL-RAHMAN BABA', Pais.GHANA),
    new Figurita (6, 'ALEXANDER DJIKU', Pais.GHANA),
    new Figurita (7, 'GIDEON MENSAH', Pais.GHANA),
    new Figurita (8, 'JONATHAN MENSAH', Pais.GHANA),
    new Figurita (9, 'ANDY YIADOM', Pais.GHANA),
    new Figurita (10, 'IDDRISU BABA', Pais.GHANA),
    new Figurita (11, 'MOHAMMED KUDUS', Pais.GHANA),
    new Figurita (12, 'DANIEL-KOFI KYEREH', Pais.GHANA),
    new Figurita (19, 'THOMAS PARTEY', Pais.GHANA),
    new Figurita (13, 'MUBARAK WAKASO', Pais.GHANA),
    new Figurita (14, 'FELIX AFENA-GYAN', Pais.GHANA),
    new Figurita (15, 'ANDRÉ AYEW', Pais.GHANA),
    new Figurita (16, 'JORDAN AYEW', Pais.GHANA),
    new Figurita (17, 'ISSAHAKU ABDUL FATAWU', Pais.GHANA),
    new Figurita (18, 'KAMALDEEN SULEMANA', Pais.GHANA),
    ],

    [
    //Uruguay
    new Figurita (1, 'ESCUDO', Pais.URUGUAY),
    new Figurita (2, 'FERNANDO MUSLERA', Pais.URUGUAY),
    new Figurita (3, 'SERGIO ROCHET', Pais.URUGUAY),
    new Figurita (4, 'RONALD ARAÚJO', Pais.URUGUAY),
    new Figurita (5, 'MARTÍN CÁCERES', Pais.URUGUAY),
    new Figurita (6, 'JOSÉ MARÍA GIMÉNEZ', Pais.URUGUAY),
    new Figurita (7, 'DIEGO GODÍN', Pais.URUGUAY),
    new Figurita (8, 'MATHÍAS OLIVERA', Pais.URUGUAY),
    new Figurita (9, 'MATÍAS VIÑA', Pais.URUGUAY),
    new Figurita (10, 'RODRIGO BENTANCUR', Pais.URUGUAY),
    new Figurita (11, 'GIORGIAN DE ARRASCAETA', Pais.URUGUAY),
    new Figurita (12, 'NICOLÁS DE LA CRUZ', Pais.URUGUAY),
    new Figurita (13, 'LOCAS TORREIRA', Pais.URUGUAY),
    new Figurita (14, 'FEDERICO VALVERDE', Pais.URUGUAY),
    new Figurita (15, 'MATÍAS VECINO', Pais.URUGUAY),
    new Figurita (16, 'EDINSON CAVANI', Pais.URUGUAY),
    new Figurita (17, 'DARWIN NÚÑEZ', Pais.URUGUAY),
    new Figurita (18, 'FACUNDO PELLISTRI', Pais.URUGUAY),
    new Figurita (19, 'LUIS SUÁREZ', Pais.URUGUAY),
    ],

    [
    //Corea del Sur
    new Figurita (1, 'ESCUDO', Pais.COREA),
    new Figurita (2, 'SEUNG-GYU KIM', Pais.COREA),
    new Figurita (3, 'HYEON-WOO JO', Pais.COREA),
    new Figurita (4, 'CHUL HONG', Pais.COREA),
    new Figurita (5, 'TAE-HWAN KIM', Pais.COREA),
    new Figurita (6, 'MIN-JAE KIM', Pais.COREA),
    new Figurita (7, 'YOUNG-GWON KIM', Pais.COREA),
    new Figurita (8, 'JIN-SU KIM', Pais.COREA),
    new Figurita (9, 'YONG LEE', Pais.COREA),
    new Figurita (10, 'IN-BEOM HWANG', Pais.COREA),
    new Figurita (11, 'WOO-YOUNG JUNG', Pais.COREA),
    new Figurita (12, 'JAE-SUNG LEE', Pais.COREA),
    new Figurita (19, 'SEUNG-HO PAIK', Pais.COREA),
    new Figurita (13, 'GUE-SUNG CHO', Pais.COREA),
    new Figurita (14, 'HEE-CHAN HWANG', Pais.COREA),
    new Figurita (15, 'UI-JO HWANG', Pais.COREA),
    new Figurita (16, 'CHANG-HOON KWON', Pais.COREA),
    new Figurita (17, 'HEUNG-MIN SON', Pais.COREA),
    new Figurita (18, 'MIN-KYU SONG', Pais.COREA),
    ],

    [
    //Museo
    new Figurita (19, 'URUGUAY30', Pais.ESPECIAL2, true),
    new Figurita (20, 'ITALIA38', Pais.ESPECIAL2, true),
    new Figurita (21, 'BRAZIL58', Pais.ESPECIAL2, true),
    new Figurita (22, 'ENGLAND66', Pais.ESPECIAL2, true),
    new Figurita (23, 'BRASIL70', Pais.ESPECIAL2, true),
    new Figurita (24, 'ARGENTINA78', Pais.ESPECIAL2, true),
    new Figurita (25, 'TALIA82', Pais.ESPECIAL2, true),
    new Figurita (26, 'ALEMANIA90', Pais.ESPECIAL2, true),
    new Figurita (27, 'FRANCIA98', Pais.ESPECIAL2, true),
    new Figurita (28, 'ESPAÑA10', Pais.ESPECIAL2, true),
    new Figurita (29, 'FRANCIA18', Pais.ESPECIAL2, true)
    ],
    //Coca Cola
    [
      new Figurita (1, 'SERGE GNABRY', Pais.BELIEVERS, false),
      new Figurita (2, 'EMILIANO MARTÍNEZ', Pais.BELIEVERS, false),
      new Figurita (3, 'KEVIN DE BRUYNE', Pais.BELIEVERS, false),
      new Figurita (4, 'LUKA MODRIĆ', Pais.BELIEVERS, false),
      new Figurita (5, 'DECLAN RICE', Pais.BELIEVERS, false),
      new Figurita (6, 'GAVI', Pais.BELIEVERS, false),
      new Figurita (7, 'HIRVING LOZANO', Pais.BELIEVERS, false),
      new Figurita (8, 'HEUNG-MIN SON', Pais.BELIEVERS, false)
    ]
  ];

}
