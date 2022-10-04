import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB5qvKQUC7rs3XGkHyKjDT0K2tid6qIt3Y",
  authDomain: "astro-a61b0.firebaseapp.com",
  databaseURL: "https://astro-a61b0.firebaseio.com",
  projectId: "astro-a61b0",
  storageBucket: "astro-a61b0.appspot.com",
  messagingSenderId: "229282067612",
  appId: "1:229282067612:web:c7a05bd8430d48cffa2959",
  measurementId: "G-N5YFT8NFVG"
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
     AngularFireModule.initializeApp(firebaseConfig),
     AngularFireDatabaseModule, 
    AngularFireAuthModule,AngularFireStorageModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
