import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.username = storedUsername;
      this.isLoggedIn = true;
    }
  }

  login() {
    if (this.username) {
      this.isLoggedIn = true;
      localStorage.setItem('username', this.username);
      localStorage.removeItem('chatMessages'); // Limpiar los mensajes del chat
      this.router.navigate(['/tabs/tab1'], { queryParams: { username: this.username } });
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    localStorage.removeItem('username');
  }
}