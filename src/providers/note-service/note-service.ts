import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteServiceProvider {
  
  public sqliteObject: any;

  constructor(private sqlite: SQLite) {
    this.sqlite.create({
      name: 'notes.db',
      location: 'default'
    }).then((db: any) => {
      console.log(db);
      this.sqliteObject = db;
      this.createTables();
    }, (err: any) => {
      console.log("!!! ", err);
    });
  }


  public createTables() {
    if (this.sqliteObject) {
      this.sqliteObject.executeSql(`create table if not exists notes(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          title TEXT, 
          text TEXT
        )`, {});
    }
  }

  public getNotes() {
    return this.sqliteObject?.executeSql('SELECT * FROM notes', []) || Promise.resolve({ rows: { length: 0, item: () => null } });
  }

  public saveNote(note: Note) {
    let sql = 'INSERT INTO notes (title, text) VALUES (?,?)';
    return this.sqliteObject?.executeSql(sql, [note.title, note.text]) || Promise.reject('DB not ready');
  }

  public updateNote(note: Note) {
    let sql = 'UPDATE notes SET title = "' + note.title + '", text = "' + note.text + '" WHERE id = "' + note.id + '"';
    this.sqliteObject?.executeSql(sql, []);
  }

  public removeNote(note: Note) {
    let sql = 'DELETE FROM notes WHERE id = "' + note.id + '"';
    this.sqliteObject?.executeSql(sql, []);
  }
}
