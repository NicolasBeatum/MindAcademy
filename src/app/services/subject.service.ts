import { Injectable } from '@angular/core';

export interface Note {
  title: string;
  content: string;
}

export interface Grade {
  name: string;
  score: string;
}

export interface Subject {
  name: string;
  days: { day: string, startTime: string, endTime: string, color: string }[];
  grades: Grade[];
  notes?: Note[];
  showGrades?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private subjects: Subject[] = [];

  constructor() {
    this.loadSubjects();
  }

  getSubjects(): Subject[] {
    return this.subjects;
  }

  addSubject(subject: Subject): void {
    this.subjects.push(subject);
    this.saveSubjects();
  }

  deleteSubject(subjectName: string): void {
    this.subjects = this.subjects.filter(subject => subject.name !== subjectName);
    this.saveSubjects();
  }

  updateSubject(subject: Subject): void {
    const index = this.subjects.findIndex(s => s.name === subject.name);
    if (index !== -1) {
      this.subjects[index] = subject;
      this.saveSubjects();
    }
  }

  addGrade(subjectName: string, grade: Grade): void {
    const subject = this.getSubjectByName(subjectName);
    if (subject) {
      subject.grades.push(grade);
      this.saveSubjects();
    }
  }

  removeGrade(subjectName: string, gradeIndex: number): void {
    const subject = this.getSubjectByName(subjectName);
    if (subject) {
      subject.grades.splice(gradeIndex, 1);
      this.saveSubjects();
    }
  }

  addNoteToSubject(subjectName: string, note: Note): void {
    const subject = this.getSubjectByName(subjectName);
    if (subject) {
      subject.notes = subject.notes || [];
      subject.notes.push(note);
      this.saveSubjects();
    }
  }

  private saveSubjects(): void {
    localStorage.setItem('subjects', JSON.stringify(this.subjects));
  }

  private loadSubjects(): void {
    const subjects = localStorage.getItem('subjects');
    if (subjects) {
      this.subjects = JSON.parse(subjects);
    }
  }

  getSubjectByName(subjectName: string): Subject | undefined {
    return this.subjects.find(subject => subject.name === subjectName);
  }
}