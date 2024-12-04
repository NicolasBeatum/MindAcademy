import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LocalNotifications } from '@capacitor/local-notifications';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    MarkdownModule.forRoot(),
    FormsModule // Añadir FormsModule a la lista de imports
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}