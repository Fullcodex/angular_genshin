import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { PersonnageComponent } from './personnage/personnage.component';

const routes: Routes = [
  { path: '', component: AccueilComponent },
  { path: 'personnage', component: PersonnageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
