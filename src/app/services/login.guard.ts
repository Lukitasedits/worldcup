import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginService:LoginService, private router:Router){

  }


  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.loginService.isLoggedIn()){
        console.log("logueado")
        return true;
      }

      this.router.navigate(['/auth']);
      console.log("no logueado")
      return false;
  }

}
