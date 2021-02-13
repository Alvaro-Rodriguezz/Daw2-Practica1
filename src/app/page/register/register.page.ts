import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {AuthenticateService} from '../../services/authenntication.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  validationsForm: FormGroup;
  errorMessage = '';
  successMessage = '';

  validationMessages = {
    email: [
      { type: 'required', message: 'Un email es necesario' },
      { type: 'pattern', message: 'Introduce un email válido' }
    ],
    password: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minlength', message: 'Tiene que tener un mínimo de 6 caracteres' }
    ],
    confirmpassword: [
      { type: 'required', message: 'La contraseña es necesaria' },
      { type: 'minlength', message: 'Tiene que tener un mínimo de 6 caracteres' }
    ]
  };

  constructor(
      private navCtrl: NavController,
      private authService: AuthenticateService,
      private formBuilder: FormBuilder,
      public toastController: ToastController
  ) {}

  ngOnInit() {
    this.validationsForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
      confirmpassword: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  tryRegister(value) {
    if(this.passwordMatch(value)){
      this.authService.registerUser(value)
      .then(res => {
        console.log(res);
        console.log('La cuenta se creo correctamente');
        this.errorMessage = '';
        this.navCtrl.navigateForward('/home').then((e) => {
          if (e) {
            console.log('Navigation is successful!');
          } else {
            console.log('Navigation has failed!');
          }
          return false;
        });
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.successMessage = '';
      });
    } 
    this.presentToast();

  }

  goLoginPage() {
    this.navCtrl.navigateBack('/login').then((e) => {
      if (e) {
        console.log('Navigation is successful!');
      } else {
        console.log('Navigation has failed!');
      }
      return false;
    });
  };

  public passwordMatch(group): boolean {
    console.log(group);
    // console.log(group.password.value)
    let match = group.password === group.confirmpassword
    if(match){
      return true;
    }
    return false;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Las contraseñas deben coincidir',
      duration: 2000
    });
    toast.present();
  }
}
