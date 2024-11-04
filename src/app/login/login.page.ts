import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  registerUsername: string = '';
  registerPassword: string = '';
  isLoggedIn: boolean = false;
  isRegistering: boolean = false;

  constructor(private router: Router, private alertController: AlertController) {}

  async ngOnInit() {
    await this.checkLoginStatus();
  }

  async checkLoginStatus() {
    const { value } = await Storage.get({ key: 'loggedInUser' });
    if (value) {
      const user = JSON.parse(value);
      this.username = user.username;
      this.isLoggedIn = true;
    }
  }

  async login() {
    const { value } = await Storage.get({ key: `user-${this.username}` });
    const user = value ? JSON.parse(value) : null;

    if (user && user.password === this.password) {
      this.isLoggedIn = true;
      await Storage.set({
        key: 'loggedInUser',
        value: JSON.stringify(user)
      });
      await Storage.set({
        key: 'isLoggedInFlag',
        value: 'true'
      });
      this.router.navigate(['/tabs/tab1']); // Redirigir a tab1 después de iniciar sesión
    } else {
      this.showAlert('Nombre de usuario o contraseña incorrectos');
    }
  }

  async register() {
    const { value } = await Storage.get({ key: `user-${this.registerUsername}` });
    if (value) {
      this.showAlert('El nombre de usuario ya existe');
      return;
    }

    const user = {
      username: this.registerUsername,
      password: this.registerPassword
    };

    await Storage.set({
      key: `user-${this.registerUsername}`,
      value: JSON.stringify(user)
    });

    this.showAlert('Usuario registrado exitosamente');
    this.isRegistering = false;
  }

  toggleRegister() {
    this.isRegistering = !this.isRegistering;
  }

  async logout() {
    await Storage.remove({ key: 'loggedInUser' });
    await Storage.remove({ key: 'isLoggedInFlag' });
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
    this.router.navigate(['/login']); // Redirigir al login después de cerrar sesión
  }

  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
}