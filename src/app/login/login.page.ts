import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  login() {
    this.isLoggedIn = true;
    // Navegar a la página principal después de iniciar sesión
    this.router.navigate(['/tabs/tab1']);
  }

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    // Permanecer en la página de inicio de sesión después de cerrar sesión
  }
}