import { Component, OnInit } from '@angular/core';
import { SubjectService, Subject } from '../services/subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.page.html',
  styleUrls: ['./add-subject.page.scss']
})
export class AddSubjectPage implements OnInit {
  subject: Subject = { name: '', days: [] };
  selectedDays: string[] = [];
  startTimes: { [key: string]: string } = {};
  endTimes: { [key: string]: string } = {};
  color: string = '';

  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit() {
    // Initialization logic here
  }

  saveSubject() {
    this.subject.days = this.selectedDays.map(day => ({
      day: day,
      startTime: this.startTimes[day],
      endTime: this.endTimes[day],
      color: this.color
    }));
    this.subjectService.addSubject(this.subject);
    this.router.navigate(['/tabs/tab2']);
  }
}