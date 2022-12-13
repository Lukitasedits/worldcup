import { VerficationEmailDto } from './../entities/verfication-email-dto';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Usuario } from './../entities/usuario';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService{

  private endPoint: string = 'http://localhost:8080/usuarios/'

  //static usuarioLogueado: Usuario;

  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(private http: HttpClient, private loginService: LoginService) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.endPoint);
  }

  getUsuario(usuarioABuscar: Usuario): Observable<Usuario>{
    return this.http.get<Usuario>(this.endPoint.concat(usuarioABuscar.username)).pipe(
      catchError( e => {
        return throwError(e);
      })
    )
  }

  updateUsuario(): Observable<Usuario>{
    this.loginService.getUser().subscribe( user => {
      return this.http.put<Usuario>(this.endPoint.concat('update/'), user, {headers: this.httpHeaders})
    })
    return of(new Usuario())
  }

  getUsuarioByUsername(username: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.endPoint.concat(username));
  }

  checkUsuario(usuario: Usuario): Observable<Usuario>{
    console.log('checkUsuario()');
    return this.http.post<Usuario>(`${this.endPoint}check`, usuario, {headers: this.httpHeaders})
  }


  create(usuarioNuevo: Usuario): Observable<Usuario>{
    console.log('create() service');

    return this.http.post<Usuario>(this.endPoint, usuarioNuevo, {headers: this.httpHeaders}).pipe(
      catchError( e => {

        /* if(e.status==400){
          return throwError(e);
        } */


        return throwError(e)
      })
    );

  }

  /* claveUsuario(usuarioABuscar: Usuario): Promise<Observable<boolean>>{
    let resultado = false;
    this.getUsuario(usuarioABuscar).subscribe(
      usuarioEnTabla => {
        console.log('en tabla: => ' + usuarioEnTabla.username)
        console.log('en tabla: => ' + usuarioEnTabla.password)
        console.log('en busca: => ' + usuarioABuscar.username)
        console.log('en busca: => ' + usuarioABuscar.password)
        if(usuarioABuscar.username == usuarioEnTabla.username && usuarioABuscar.password == usuarioEnTabla.password){
          console.log('hola');
          resultado = true;
        }
      }
    )

    return of(resultado);
  } */


  existUsuarioByUsername(username: string): Observable<boolean>{
    let resultado = false;
    this.getUsuarioByUsername(username).subscribe(
      usuarioEnTabla => {
        if(usuarioEnTabla != null){ resultado = true; }
      }
    )
    return of(resultado);
  }

  enviarMailRecuperacion(){
    console.log('se envió el mail con éxito');
  }

}
