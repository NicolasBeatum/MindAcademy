import { Component, OnInit } from '@angular/core';
import { SubjectService, Subject } from '../services/subject.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.subjects = this.subjectService.getSubjects();
  }

  getSubjectsByDay(day: string): Subject[] {
    return this.subjects.filter(subject => subject.days && subject.days.some(d => d.day === day));
  }
}