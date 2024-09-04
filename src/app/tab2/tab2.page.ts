import { Component, OnInit } from '@angular/core';
import { SubjectService, Subject } from '../services/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  subjects: Subject[] = [];

  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit() {
    this.subjects = this.subjectService.getSubjects();
  }

  deleteSubject(subjectName: string) {
    this.subjectService.deleteSubject(subjectName);
    this.subjects = this.subjectService.getSubjects();
  }

  navigateToAddSubject() {
    this.router.navigate(['/add-subject']);
  }
}