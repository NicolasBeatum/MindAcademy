import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SubjectService, Note } from '../services/subject.service';

@Component({
  selector: 'app-note-detail-modal',
  templateUrl: './note-detail-modal.component.html',
  styleUrls: ['./note-detail-modal.component.scss'],
})
export class NoteDetailModalComponent implements OnInit {
  @Input() note: Note | null = null; // Inicializar la propiedad
  @Input() subjectName: string = ''; // Inicializar la propiedad
  noteTitle: string = '';
  noteContent: string = '';

  constructor(
    private modalController: ModalController,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    if (this.note) {
      this.noteTitle = this.note.title;
      this.noteContent = this.note.content;
    }
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  saveNote() {
    if (this.note) {
      this.note.title = this.noteTitle;
      this.note.content = this.noteContent;
      const subject = this.subjectService.getSubjectByName(this.subjectName);
      if (subject) {
        this.subjectService.updateSubject(subject);
      }
    } else {
      const newNote: Note = { title: this.noteTitle, content: this.noteContent };
      this.subjectService.addNoteToSubject(this.subjectName, newNote);
    }
    this.dismissModal();
  }

  deleteNote() {
    const subject = this.subjectService.getSubjectByName(this.subjectName);
    if (subject && subject.notes) {
      subject.notes = subject.notes.filter(n => n !== this.note);
      this.subjectService.updateSubject(subject);
    }
    this.dismissModal();
  }
}