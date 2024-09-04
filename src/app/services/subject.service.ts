import { Injectable } from '@angular/core';

export interface Subject {
  name: string;
  days: { day: string, startTime: string, endTime: string, color: string }[];
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

  private saveSubjects(): void {
    localStorage.setItem('subjects', JSON.stringify(this.subjects));
  }

  private loadSubjects(): void {
    const subjects = localStorage.getItem('subjects');
    if (subjects) {
      this.subjects = JSON.parse(subjects);
    }
  }
}