import { NavController } from 'ionic-angular';
import { NoteService, Note } from '../../providers/note-service/note-service';
import { NoteDetailPage } from '../note-detail/note-detail';
import { Component } from '@angular/core';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  notes: Note[];
  constructor(public nav: NavController, public noteService: NoteService) {
  }

  private loadNotes() {
    this.notes = [];
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

  // Push the details page bute without an existing note
  public addNote() {
    this.nav.push(NoteDetailPage);
  }

  // Push the details page for our selected Note
  public noteSelected(item: Note) {
    this.nav.push(NoteDetailPage, { 'note': item });
  }

  // Remove the note from the DB and our current arra
  public removeNote(note: Note) {
    this.noteService.removeNote(note);
    let index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
    }
  }

  // Load our todos once the page appears
  private ionViewDidEnter() {
    this.loadNotes();
  }

  private ionViewLoaded(){
    this.loadNotes();
  }

}
