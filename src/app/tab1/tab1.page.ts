import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { SubjectService, Subject } from '../services/subject.service';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  subjects: Subject[] = [];
  userName: string = ''; // Inicializar la propiedad userName

  constructor(
    private subjectService: SubjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.subjects = this.subjectService.getSubjects();
    this.route.queryParams.subscribe(params => {
      this.userName = params['username'] || localStorage.getItem('username') || '';
    });
    await this.loadUserName();
  }

  ionViewWillEnter() {
    this.subjects = this.subjectService.getSubjects();
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

  async loadUserName() {
    const { value } = await Storage.get({ key: 'loggedInUser' });
    if (value) {
      const user = JSON.parse(value);
      this.userName = user.username;
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
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
}