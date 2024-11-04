import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectService, Note } from '../services/subject.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  subjectName: string = '';
  notes: Note[] = [];
  selectedNote: Note | null = null;
  isEditing: boolean = false;
  capturedImage: string | null | undefined = null;

  constructor(
    private route: ActivatedRoute,
    private subjectService: SubjectService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.subjectName = name;
      const subject = this.subjectService.getSubjectByName(this.subjectName);
      if (subject) {
        this.notes = subject.notes || [];
      }
    }
  }

  openNoteDetail(note: Note) {
    this.selectedNote = note;
    this.isEditing = false;
    this.loadImage();
  }

  closeNoteDetail() {
    this.selectedNote = null;
    this.isEditing = false;
    this.capturedImage = null;
  }

  openNewNoteModal() {
    this.selectedNote = { title: '', content: '' };
    this.isEditing = true;
  }

  enableEditing() {
    this.isEditing = true;
  }

  async captureImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.capturedImage = image.dataUrl;
    await this.saveImage();
  }

  async saveImage() {
    if (this.selectedNote && this.capturedImage) {
      await Storage.set({
        key: `note-image-${this.selectedNote.title}`,
        value: this.capturedImage
      });
    }
  }

  async loadImage() {
    if (this.selectedNote) {
      const { value } = await Storage.get({
        key: `note-image-${this.selectedNote.title}`
      });
      this.capturedImage = value;
    }
  }

  saveNote() {
    if (this.selectedNote) {
      if (this.selectedNote.title && this.selectedNote.content) {
        const subject = this.subjectService.getSubjectByName(this.subjectName);
        if (subject) {
          if (!subject.notes) {
            subject.notes = [];
          }
          const existingNoteIndex = subject.notes.findIndex(n => n === this.selectedNote);
          if (existingNoteIndex !== -1) {
            subject.notes[existingNoteIndex] = this.selectedNote;
          } else {
            subject.notes.push(this.selectedNote);
          }
          this.subjectService.updateSubject(subject);
          this.notes = subject.notes;
        }
      }
      this.selectedNote = null;
      this.isEditing = false;
      this.capturedImage = null;
    }
  }

  deleteNote() {
    if (this.selectedNote) {
      const subject = this.subjectService.getSubjectByName(this.subjectName);
      if (subject && subject.notes) {
        subject.notes = subject.notes.filter(n => n !== this.selectedNote);
        this.subjectService.updateSubject(subject);
        this.notes = subject.notes;
      }
      this.selectedNote = null;
      this.isEditing = false;
      this.capturedImage = null;
    }
  }
}