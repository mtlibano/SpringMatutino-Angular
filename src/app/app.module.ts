import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './modules/home/home.module';
import { UsersModule } from './modules/users/users.module';
import { HttpClientModule } from '@angular/common/http';
import { MenuModule } from './modules/menu/menu.module';
import { PaisModule } from './modules/pais/pais.module';
import { EquipeModule } from './modules/equipe/equipe.module';
import { CampeonatoModule } from './modules/campeonato/campeonato.module';
import { PistaModule } from './modules/pista/pista.module';
import { PilotoModule } from './modules/piloto/piloto.module';
import { CorridaModule } from './modules/corrida/corrida.module';
import { LoginModule } from './modules/login/login.module';
import { PilotoCorridaModule } from './modules/piloto-corrida/piloto-corrida.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    LoginModule,
    UsersModule,
    PaisModule,
    EquipeModule,
    CampeonatoModule,
    PistaModule,
    PilotoModule,
    CorridaModule,
    PilotoCorridaModule,
    MenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
