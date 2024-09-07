import { Component, OnInit } from '@angular/core';
import { SubjectService, Subject } from '../services/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService
    , private router: Router
  ) {}

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.subjects = this.subjectService.getSubjects();
  }

  getSubjectsByDay(day: string): Subject[] {
    return this.subjects
      .filter(subject => subject.days.some(d => d.day === day))
      .map(subject => ({
        ...subject,
        days: subject.days.filter(d => d.day === day)
      }))
      .sort((a, b) => {
        const timeA = a.days[0].startTime;
        const timeB = b.days[0].startTime;
        return timeA.localeCompare(timeB);
      });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}