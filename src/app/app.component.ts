import { ScrollService } from 'src/app/services/scroll.service';
import { LoginService } from './services/login.service';
import { NavigationStart, Router } from '@angular/router';
import { Component, HostListener, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'mundial-app';

  constructor(private route: Router, private loginService: LoginService, private scrollSrv: ScrollService){
    route.events.subscribe((event) => { //si se refresca...
      if (event instanceof NavigationStart) {
        if(!route.navigated){
          //loginService.logout(); //se desloguea
        }
      }
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const verticalOffset = window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop || 0;
    this.scrollSrv.saveCurrentScroll(verticalOffset);
  }




}
