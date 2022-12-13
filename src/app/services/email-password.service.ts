import { ChangePasswordDto } from './../entities/change-password-dto';
import { EmailValuesDto } from './../entities/email-values-dto';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Usuario } from '../entities/usuario';
import { VerficationEmailDto } from '../entities/verfication-email-dto';

@Injectable({
  providedIn: 'root'
})
export class EmailPasswordService {

  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private httpClient: HttpClient) { }

  public sendEmailRegister(dto: EmailValuesDto): Observable<any>{
    console.log('sendEmail()');

    return this.httpClient.post<any>('http://localhost:8080/email-password/send-email-register', dto, {headers:{skip:"true"}}).pipe(
      catchError( e => {
         if(e.status==400){
          return throwError(e);
        }
        return throwError(e)
      })
    );
  }

  public sendEmailRecover(dto: EmailValuesDto): Observable<any>{
    console.log('sendEmail()');

    return this.httpClient.post<any>('http://localhost:8080/email-password/send-email-recover', dto, {headers:{skip:"true"}}).pipe(
      catchError( e => {
         if(e.status==400){
          return throwError(e);
        }
        return throwError(e)
      })
    );
  }

  habilitarUsuario(dto: VerficationEmailDto): Observable<Usuario>{
    console.log('habilitarUsuario()')
    return this.httpClient.post<Usuario>(`http://localhost:8080/email-password/email-verification`, dto, {headers:{skip:"true"}})
  }

  public changePassword(dto: ChangePasswordDto): Observable<any>{
    return this.httpClient.post<any>('http://localhost:8080/email-password/change-password', dto, {headers:{skip:"true"}});
  }
}
