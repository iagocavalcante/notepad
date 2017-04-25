import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NoteDetailPage } from '../pages/note-detail/note-detail';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NoteService } from '../providers/note-service/note-service';
import {CKEditorModule} from 'ng2-ckeditor';


@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    NoteDetailPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    CKEditorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NoteDetailPage
  ],
  providers: [
    NoteService,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
