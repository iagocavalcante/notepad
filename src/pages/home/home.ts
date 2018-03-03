import { NavController } from 'ionic-angular';
import { NoteServiceProvider, Note } from '../../providers/note-service/note-service';
import { NoteDetailPage } from '../note-detail/note-detail';
import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  notes: Note[];
  constructor(public nav: NavController, public noteService: NoteServiceProvider) {
  }

  private loadNotes() {
    this.noteService.getNotes().then(
      data => {
        this.notes = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i);
            this.notes.push(new Note(item.title, item.text, item.id));
          }
        }
      });
  }

  public addNote() {
    this.nav.push(NoteDetailPage);
  }

  public noteSelected(item: Note) {
    this.nav.push(NoteDetailPage, { 'note': item });
  }

  public removeNote(note: Note) {
    this.noteService.removeNote(note);
    let index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
    }
  }

  ionViewDidLoad(){
    this.loadNotes();
  }

}
