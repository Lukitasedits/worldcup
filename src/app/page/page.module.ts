import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { AlbumComponent } from './album/album.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { PorcentajeComponent } from './porcentaje/porcentaje.component';
import { FooterComponent } from './footer/footer.component';
import { ProximoPartidoComponent } from './proximo-partido/proximo-partido.component';
import { PanelScrollComponent } from './album/panel-scroll/panel-scroll.component';
import { StickerComponent } from './album/sticker/sticker.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';

@NgModule({
  declarations: [
    AlbumComponent,
    MenuPrincipalComponent,
    PorcentajeComponent,
    FooterComponent,
    ProximoPartidoComponent,
    PanelScrollComponent,
    StickerComponent,
    CerrarSesionComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
