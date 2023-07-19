import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './modules/home/home-page/home-page.component';
import { UsersComponent } from './modules/users/components/users/users.component';
import { PaisComponent } from './modules/pais/components/pais/pais.component';
import { EquipeComponent } from './modules/equipe/components/equipe/equipe.component';
import { CampeonatoComponent } from './modules/campeonato/components/campeonato/campeonato.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'users', component: UsersComponent },
  { path: 'pais', component: PaisComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'campeonato', component: CampeonatoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
