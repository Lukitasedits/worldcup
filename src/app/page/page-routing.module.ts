import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { AlbumComponent } from './album/album.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '',
  children: [
    {path:'coleccion', component: AlbumComponent},
    {path:'inicio', component: MenuPrincipalComponent},
    {path:'', redirectTo:'inicio', pathMatch:'full'},
    {path: '**', redirectTo:'inicio'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
