import { Injectable } from '@angular/core';

export interface Grade {
  name: string;
  score: string;
}

export interface Subject {
  name: string;
  days: { day: string, startTime: string, endTime: string, color: string }[];
  grades: Grade[];
  showGrades?: boolean; // Agregar esta línea
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

  addGrade(subjectName: string, grade: Grade): void {
    const subject = this.getSubjectByName(subjectName);
    if (subject) {
      subject.grades.push(grade);
      this.saveSubjects();
    }
  }

  deleteGrade(subjectName: string, gradeName: string): void {
    const subject = this.getSubjectByName(subjectName);
    if (subject) {
      subject.grades = subject.grades.filter(grade => grade.name !== gradeName);
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

  removeGrade(subjectName: string, gradeIndex: number) {
    const subject = this.subjects.find(sub => sub.name === subjectName);
    if (subject) {
      subject.grades.splice(gradeIndex, 1);
    }
  }
}