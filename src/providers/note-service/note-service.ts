import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

/*
  Generated class for the NoteService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
export class Note {
  title: string;
  text: string;
  id: number;
  constructor(title: string, text: string, id: number) {
    this.title = title;
    this.text = text;
    this.id = id;
  }
}

@Injectable()
export class NoteService {
  public sqlstorage: SQLite;
  // Init an empty DB if it does not exist by now!
  constructor() {
    this.sqlstorage = new SQLite();
    this.sqlstorage.openDatabase({ name: "notes.db", location: "default" }).then(() => {
      this.createTables();
    }, (err) => {
      console.log("!!! ", err);
    });
  }


  public createTables() {
    this.sqlstorage.executeSql(`create table if not exists notes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT, 
            text TEXT
        )`, {});
  }
  
  // Get all notes of our DB
  public getNotes() {
    return this.sqlstorage.executeSql('SELECT * FROM notes', []);
  }

  // Save a new note to the DB
  public saveNote(note: Note) {
    let sql = 'INSERT INTO notes (title, text) VALUES (?,?)';
    return this.sqlstorage.executeSql(sql, [note.title, note.text]);
  }

  // Update an existing note with a given ID
  public updateNote(note: Note) {
    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\" WHERE id = \"' + note.id + '\"';
    this.sqlstorage.executeSql(sql, []);
  }

  // Remoe a not with a given ID
  public removeNote(note: Note) {
    let sql = 'DELETE FROM notes WHERE id = \"' + note.id + '\"';
    this.sqlstorage.executeSql(sql, []);
  }

}