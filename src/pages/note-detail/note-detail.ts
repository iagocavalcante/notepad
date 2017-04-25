import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import {NoteService, Note} from '../../providers/note-service/note-service';

/*
  Generated class for the NoteDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html'
})
export class NoteDetailPage {

  note: Note = null;
 
  constructor(public nav: NavController, navParams: NavParams, public noteService: NoteService, private toastCtrl: ToastController) {
    let passedNote = navParams.get('note');
    // Try to initialise our note for the page
    if (passedNote !== undefined) {
      this.note = passedNote;
    } else {
      this.note = new Note('', '', null);
      this.saveNote();
    }
  }
 
  // Save our note to the DB and show a message (optional)
  public saveNote(showBadge: boolean = false) {
    if (this.note.id === null) {
      this.noteService.saveNote(this.note).then((data) => {
        console.log('Dados da promise', data);
        this.note.id = data.insertId;
      },
      (erro) => {
        console.log("Erro ao inserir nova nota");
      });
    } else {
      this.noteService.updateNote(this.note);
    }
    if (showBadge) {
      let toast = this.toastCtrl.create({
         message: 'Nota inserida com sucesso!',
         duration: 3000
       });
      toast.present();
    }
  }
 
  // Called when this page is popped from the nav stack
  private ionViewWillUnload() {
    this.saveNote(true);
  }

}
