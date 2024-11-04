import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NotesPage } from './notes.page';
import { NoteDetailModalComponent } from '../note-detail-modal/note-detail-modal.component'; // Asegúrate de que la ruta sea correcta
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NotesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NotesPage, NoteDetailModalComponent]
})
export class NotesPageModule {}