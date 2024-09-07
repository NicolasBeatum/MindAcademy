import { Component, OnInit } from '@angular/core';
import { SubjectService, Subject, Grade } from '../services/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  subjects: Subject[] = [];
  newGradeName: string = '';
  newGradeScore: string = '';

  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit() {
    this.subjects = this.subjectService.getSubjects().map(subject => ({
      ...subject,
      showGrades: false
    }));
  }

  ionViewWillEnter() {
    this.subjects = this.subjectService.getSubjects().map(subject => ({
      ...subject,
      showGrades: false
    }));
  }

  toggleGrades(subject: Subject) {
    subject.showGrades = !subject.showGrades;
  }

  addGrade(subjectName: string) {
    const grade: Grade = { name: `Calificación ${Math.random()}`, score: '' };
    this.subjectService.addGrade(subjectName, grade);
    this.subjects = this.subjectService.getSubjects().map(subject => ({
      ...subject,
      showGrades: subject.showGrades || false
    }));
  }

  addGradeToSubject(subject: Subject) {
    if (this.newGradeName && this.newGradeScore) {
      const grade: Grade = { name: this.newGradeName, score: this.newGradeScore };
      this.subjectService.addGrade(subject.name, grade);
      this.subjects = this.subjectService.getSubjects().map(sub => ({
        ...sub,
        showGrades: sub.showGrades || false
      }));
      this.newGradeName = '';
      this.newGradeScore = '';
    }
  }

  removeGrade(subjectName: string, gradeIndex: number) {
    this.subjectService.removeGrade(subjectName, gradeIndex);
    this.subjects = this.subjectService.getSubjects().map(subject => ({
      ...subject,
      showGrades: subject.showGrades || false
    }));
  }

  navigateToTab2() {
    this.router.navigate(['/tabs/tab2']);
  }
}