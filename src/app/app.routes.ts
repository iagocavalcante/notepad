import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home';
import { NoteDetailPage } from '../pages/note-detail/note-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'note-detail', component: NoteDetailPage },
  { path: 'note-detail/:note', component: NoteDetailPage }
];
