import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  saveCurrentScroll(scroll: number){
    localStorage.setItem('scroll', scroll.toString());
  }

  getStorageScroll():number{
    return parseInt(localStorage.getItem('scroll')||'0');
  }
}
