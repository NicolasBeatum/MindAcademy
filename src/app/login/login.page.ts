import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = '';
  isLoggedIn: boolean = false;
  userIcon: string = 'https://w7.pngwing.com/pngs/981/645/png-transparent-default-profile-united-states-computer-icons-desktop-free-high-quality-person-icon-miscellaneous-silhouette-symbol.png';

  constructor(private router: Router) {}

  ngOnInit() {
    const storedUsername = localStorage.getItem('username');
    const storedIcon = localStorage.getItem('userIcon');

    if (storedUsername) {
      this.username = storedUsername;
      this.isLoggedIn = true;
    }
    if (storedIcon) {
      this.userIcon = storedIcon;
    }
  }

  login() {
    if (this.username) {
      this.isLoggedIn = true;
      localStorage.setItem('username', this.username);
      localStorage.removeItem('chatMessages');
      this.router.navigate(['/tabs/tab1'], { queryParams: { username: this.username } });
    }
  }

  

  logout() {
    this.isLoggedIn = false;
    this.username = '';
    this.userIcon = 'assets/default-icon.png';
    localStorage.removeItem('username');
    localStorage.removeItem('userIcon');
  }

  async changeIcon() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt,
      });

      this.userIcon = image.webPath || this.userIcon;

      if (image.webPath) {
        localStorage.setItem('userIcon', image.webPath);
      }
    } catch (error) {
      console.error('Error al cambiar el icono:', error);
    }
  }
}
