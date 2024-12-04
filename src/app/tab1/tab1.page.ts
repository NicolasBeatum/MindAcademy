import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Storage } from '@capacitor/storage';
import { LocalNotifications } from '@capacitor/local-notifications';
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
    this.checkForUpcomingClasses();
  }

  ionViewWillEnter() {
    this.subjects = this.subjectService.getSubjects();
    this.checkForUpcomingClasses();
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
  // Función para verificar las clases próximas
  checkForUpcomingClasses() {
    const now = new Date();
    const currentDay = this.getDayOfWeek(now.getDay());
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Hora actual en minutos

    this.subjects.forEach(subject => {
      subject.days.forEach((schedule) => {
        if (schedule.day === currentDay) {
          const classStartTime = this.convertToMinutes(schedule.startTime);
          const timeDifference = classStartTime - currentTime;

          // Si la diferencia de tiempo es menor o igual a 10 minutos
          if (timeDifference > 0 && timeDifference <= 10) {
            this.scheduleNotification(subject.name, schedule.startTime, timeDifference);
          }
        }
      });
    });
  }

  // Convertir una hora en formato HH:mm a minutos
  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(num => parseInt(num, 10));
    return hours * 60 + minutes;
  }

  // Obtener el día de la semana en texto
  getDayOfWeek(dayIndex: number): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayIndex];
  }

  // Programar la notificación
  async scheduleNotification(subjectName: string, startTime: string, timeBefore: number) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title: `¡Próxima clase: ${subjectName}!`,
          body: `Tu clase de ${subjectName} comienza a las ${startTime}.`,
          id: new Date().getTime(),  // Usar el timestamp como ID único
          schedule: { at: new Date(new Date().getTime() + timeBefore * 60 * 1000) },  // Notificación en 'timeBefore' minutos
        }
      ]
    });
  }


}