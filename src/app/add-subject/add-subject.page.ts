import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from '../services/subject.service'; // Ajusta la ruta según sea necesario

interface Subject {
  name: string;
  days: Array<{ day: string, startTime: string, endTime: string, color: string }>;
}

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

  addDays() {
    this.selectedDays.forEach(day => {
      this.subject.days.push({
        day: day,
        startTime: this.startTimes[day],
        endTime: this.endTimes[day],
        color: this.color
      });
    });
    this.selectedDays = [];
    this.startTimes = {};
    this.endTimes = {};
    this.color = '';
  }

  saveSubject() {
    this.subjectService.addSubject(this.subject);
    this.router.navigate(['/tabs/tab2']);
  }
}