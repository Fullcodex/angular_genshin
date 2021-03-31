import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ElementComponent } from './element/element.component';
import { PersonnageComponent } from './personnage/personnage.component';

const url = 'http://127.0.0.1:8000/api/';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'personnage', component: PersonnageComponent, data:{uneUrl:url} },
  { path: 'element', component: ElementComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
