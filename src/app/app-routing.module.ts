import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './modules/users/components/users/users.component';
import { PaisComponent } from './modules/pais/components/pais/pais.component';
import { EquipeComponent } from './modules/equipe/components/equipe/equipe.component';
import { CampeonatoComponent } from './modules/campeonato/components/campeonato/campeonato.component';
import { PistaComponent } from './modules/pista/components/pista/pista.component';
import { PilotoComponent } from './modules/piloto/components/piloto/piloto.component';
import { CorridaComponent } from './modules/corrida/components/corrida/corrida.component';
import { LoginComponent } from './modules/login/components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent },
  { path: 'pais', component: PaisComponent },
  { path: 'equipe', component: EquipeComponent },
  { path: 'campeonato', component: CampeonatoComponent },
  { path: 'pista', component: PistaComponent },
  { path: 'piloto', component: PilotoComponent },
  { path: 'corrida', component: CorridaComponent },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
