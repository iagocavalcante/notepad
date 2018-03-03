<<<<<<< HEAD
import { NoteDetailPage } from './../pages/note-detail/note-detail';
=======
>>>>>>> a635465554b206490ad996b72a8cd429b7924e92
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
<<<<<<< HEAD
import { SQLite } from '@ionic-native/sqlite';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NoteServiceProvider } from '../providers/note-service/note-service';
=======

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
>>>>>>> a635465554b206490ad996b72a8cd429b7924e92

@NgModule({
  declarations: [
    MyApp,
<<<<<<< HEAD
    HomePage,
    NoteDetailPage
=======
    HomePage
>>>>>>> a635465554b206490ad996b72a8cd429b7924e92
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
<<<<<<< HEAD
    HomePage,
    NoteDetailPage
  ],
  providers: [
    StatusBar,
    SQLite,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NoteServiceProvider
=======
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
>>>>>>> a635465554b206490ad996b72a8cd429b7924e92
  ]
})
export class AppModule {}
