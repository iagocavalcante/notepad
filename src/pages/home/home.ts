import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NoteServiceProvider } from '../../providers/note-service/note-service';
import { Note } from '../../providers/note-service/note';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage implements OnInit {
  notes: Note[] = [];

  constructor(
    private router: Router,
    public noteService: NoteServiceProvider
  ) {}

  ngOnInit() {
    this.loadNotes();
  }

  ionViewWillEnter() {
    this.loadNotes();
  }

  private loadNotes() {
    this.noteService.getNotes().then(
      (data: any) => {
        this.notes = [];
        if (data.rows.length > 0) {
          for (let i = 0; i < data.rows.length; i++) {
            let item = data.rows.item(i);
            this.notes.push(new Note(item.title, item.text, item.id));
          }
        }
      });
  }

  public addNote() {
    this.router.navigate(['/note-detail']);
  }

  public noteSelected(item: Note) {
    this.router.navigate(['/note-detail', { note: JSON.stringify(item) }]);
  }

  public removeNote(note: Note) {
    this.noteService.removeNote(note);
    let index = this.notes.indexOf(note);

    if (index > -1) {
      this.notes.splice(index, 1);
    }
  }
}
