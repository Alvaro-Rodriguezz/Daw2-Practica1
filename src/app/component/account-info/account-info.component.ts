import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticateService } from 'src/app/services/authenntication.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss'],
})
export class AccountInfoComponent implements OnInit {

  userEmail: string;
  constructor(
    private alertController: AlertController,
    private authService: AuthenticateService,
    private navController: NavController) { }

  ngOnInit() {
    if(this.authService.isLogged){
      this.userEmail = this.authService.userDetails().email;
    }
  }

  async usuarioAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario',
      subHeader: this.userEmail,
      buttons: ['Cerrar']
    });
    console.log(this.userEmail);
    
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(result);
  }

  logout() {
    this.authService.logoutUser()
        .then(res => {
          this.navController.navigateBack('/login')
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
  }
}
