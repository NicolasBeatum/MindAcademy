import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private alertController: AlertController) {}

  async canActivate(): Promise<boolean> {
    const { value } = await Storage.get({ key: 'isLoggedInFlag' });
    const isLoggedIn = value === 'true';
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      this.showAlert('Necesitas iniciar sesión');
    }
    return isLoggedIn;
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