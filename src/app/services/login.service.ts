import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private endPoint: string = 'http://localhost:8080/'

  constructor(private http: HttpClient) { }

  public generateToken(loginData: any){
  return this.http.post(`${this.endPoint}generate-token`, loginData);
  }

  public loginUser(token:any){
    localStorage.setItem('token', token);
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false
    } else {
      return true
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
    return localStorage.getItem('token');
  }

  public setUser(user: any){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): Observable<any>{
    let userStr = localStorage.getItem('user');
    if(userStr != null){ //si existe
      return of(JSON.parse(userStr));
    }else{ //si no
      this.logout(); //cierro la sesión
      return of(null);
    }
  }

  public getUserRole(){
    //let user;
    this.getUser().subscribe(user => {
      return user.authorities[0].authority;
    });
  }

  public getCurrentUser(){
    return this.http.get(`${this.endPoint}actual-usuario`);
  }
}
