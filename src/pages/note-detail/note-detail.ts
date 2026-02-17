import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteServiceProvider } from '../../providers/note-service/note-service';
import { Note } from '../../providers/note-service/note';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.html',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NoteDetailPage implements OnInit {
  note: Note | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public noteService: NoteServiceProvider
  ) {}

  ngOnInit() {
    const noteParam = this.route.snapshot.paramMap.get('note');
    
    if (noteParam) {
      this.note = JSON.parse(noteParam);
    } else {
      this.note = new Note('', '', null);
      this.saveNote();
    }
  }

  public saveNote(showToast = false) {
    if (!this.note) return;

    if (!this.note.id) {
      this.noteService.saveNote(this.note).then((data: any) => {
        console.log('Dados da promise', data);
        this.note!.id = data.insertId;
      },
      (erro: any) => {
        console.log("Erro ao inserir nova nota", erro);
      });
    } else {
      this.noteService.updateNote(this.note);
    }
  }

  ionViewWillLeave() {
    this.saveNote(true);
  }
}
