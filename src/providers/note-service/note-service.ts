import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
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
export class NoteServiceProvider {
  public sqliteObject: SQLiteObject;
  constructor(private sqlite: SQLite) {
    this.sqliteObject = new SQLiteObject(this.sqlite);
    this.sqlite.create({
      name: 'notes.db',
      location: 'default'
    }).then(() => {
      this.createTables();
    }, (err) => {
      console.log("!!! ", err);
    });
  }


  public createTables() {
    this.sqliteObject.executeSql(`create table if not exists notes(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, 
        text TEXT
      )`, {});
  }

  public getNotes() {
    return this.sqliteObject.executeSql('SELECT * FROM notes', []);
  }

  public saveNote(note: Note) {
    let sql = 'INSERT INTO notes (title, text) VALUES (?,?)';
    return this.sqliteObject.executeSql(sql, [note.title, note.text]);
  }

  public updateNote(note: Note) {
    let sql = 'UPDATE notes SET title = \"' + note.title + '\", text = \"' + note.text + '\" WHERE id = \"' + note.id + '\"';
    this.sqliteObject.executeSql(sql, []);
  }

  public removeNote(note: Note) {
    let sql = 'DELETE FROM notes WHERE id = \"' + note.id + '\"';
    this.sqliteObject.executeSql(sql, []);
  }

}
