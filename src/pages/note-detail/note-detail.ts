import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NoteServiceProvider, Note} from '../../providers/note-service/note-service';

@IonicPage()
@Component({
  selector: 'page-note-detail',
  templateUrl: 'note-detail.html'
})
export class NoteDetailPage {

  note: Note = null;
 
  constructor(public nav: NavController, navParams: NavParams, public noteService: NoteServiceProvider, private toastCtrl: ToastController) {
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
