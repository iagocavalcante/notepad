import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import 'rxjs/add/operator/map';

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
  
  public getNotes() {
    return this.sqlstorage.executeSql('SELECT * FROM notes', []);
  }

  public saveNote(note: Note) {
    let sql = 'INSERT INTO notes (title, text) VALUES (?,?)';
    return this.sqlstorage.executeSql(sql, [note.title, note.text]);
  }

  public updateNote(note: Note) {
    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\" WHERE id = \"' + note.id + '\"';
    this.sqlstorage.executeSql(sql, []);
  }

  public removeNote(note: Note) {
    let sql = 'DELETE FROM notes WHERE id = \"' + note.id + '\"';
    this.sqlstorage.executeSql(sql, []);
  }

}