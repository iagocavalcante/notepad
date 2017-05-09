import { Component } from '@angular/core';
import { NavController, NavParams, ToastController} from 'ionic-angular';
import { NoteService, Note} from '../../providers/note-service/note-service';

@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html'
})
export class NoteDetailPage {

  note: Note = null;
 
  constructor(public nav: NavController, navParams: NavParams, public noteService: NoteService, private toastCtrl: ToastController) {
    let passedNote = navParams.get('note');
    
    if (passedNote !== undefined) {
      this.note = passedNote;
    } else {
      this.note = new Note('', '', null);
      this.saveNote();
    }
  }
 
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
 
  ionViewDidLeave() {
    this.saveNote(true);
  }

}
