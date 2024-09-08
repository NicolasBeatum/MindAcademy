import { Component, OnInit } from '@angular/core';
import { SubjectService, Subject } from '../services/subject.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  subjects: Subject[] = [];
  userName: string = ''; // Inicializar la propiedad userName

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subjects = this.subjectService.getSubjects();
    this.route.queryParams.subscribe(params => {
      this.userName = params['username'] || localStorage.getItem('username') || '';
    });
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

  saveChanges(day: string) {
    // Aquí puedes agregar la lógica para guardar los cambios realizados en los horarios de las clases
    console.log(`Cambios guardados para el día ${day}`);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}