import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Formulario } from 'src/app/model/formulario.model';
import { AuthenticateService } from 'src/app/services/authenntication.service';
import { FormService } from 'src/app/services/form.service';
import {  ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  validationsForm: FormGroup;
  userEmail: string;
  form: Formulario = {
    name: "",
    description:"",
    phone: 0,
    userEmail: "",
  }
  validationMessages = {
    phone: [
      { type: 'required', message: 'Un teléfono es necesario' },
      { type: 'pattern', message: 'Introduce un teléfono válido (9 números)' }
    ]};
  constructor(
    private authService: AuthenticateService,
    private navController: NavController,
    private formService: FormService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.userEmail = this.authService.userDetails().email;
    console.log(this.authService.userDetails());
    this.validationsForm = new FormGroup({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9]{9}$')
      ])),
      description: new FormControl('', Validators.compose([
        Validators.required
      ])),
    });
  }


  public onSubmit() {
    if (this.validationsForm.valid) {
      try {
        this.form.description = this.validationsForm.get('description').value;
        this.form.name = this.validationsForm.get('name').value;
        this.form.phone = this.validationsForm.get('phone').value;
        this.form.userEmail = this.userEmail;
        this.formService.addFormulario(this.form);
        this.navController.navigateForward('/datos');
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('El formulario tiene campos incorrectos');
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'El formulario tiene campos incorrectos',
      duration: 2000
    });
    toast.present();
  }

}
