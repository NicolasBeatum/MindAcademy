import { Component, OnInit } from '@angular/core';
import { SubjectService, Subject } from '../services/subject.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.page.html',
  styleUrls: ['./add-subject.page.scss']
})
export class AddSubjectPage implements OnInit {
  subject: Subject = { name: '', days: [], grades: [] }; // Agregar grades: []
  selectedDays: string[] = [];
  startTimes: { [key: string]: string } = {};
  endTimes: { [key: string]: string } = {};
  color: string = '';
  isEditMode: boolean = false;

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const subjectName = this.route.snapshot.paramMap.get('name');
    if (subjectName) {
      const subject = this.subjectService.getSubjectByName(subjectName);
      if (subject) {
        this.subject = subject;
        this.selectedDays = subject.days.map(day => day.day);
        this.startTimes = {};
        this.endTimes = {};
        subject.days.forEach(day => {
          this.startTimes[day.day] = day.startTime;
          this.endTimes[day.day] = day.endTime;
        });
        this.color = subject.days[0]?.color || '';
        this.isEditMode = true;
      }
    }
  }

  saveSubject() {
    this.subject.days = this.selectedDays.map(day => ({
      day: day,
      startTime: this.startTimes[day],
      endTime: this.endTimes[day],
      color: this.color
    }));
    if (this.isEditMode) {
      // Update logic if needed
    } else {
      this.subjectService.addSubject(this.subject);
    }
    this.router.navigate(['/tabs/tab2']);
  }
}