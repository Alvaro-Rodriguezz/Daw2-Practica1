import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Formulario } from 'src/app/model/formulario.model';
import { AuthenticateService } from 'src/app/services/authentication.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  validationsForm: FormGroup;
  private form: Formulario;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticateService,
    private navController: NavController,
    private formService: FormService
  ) {}

  ngOnInit() {
    

    this.validationsForm = this.formBuilder.group({
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


  public async onSubmit(): Promise<void> {
    if (this.validationsForm.valid) {
      try {
        this.form.description = this.validationsForm.get('description').value;
        this.form.name = this.validationsForm.get('name').value;
        this.form.phone = this.validationsForm.get('phone').value;
        this.formService.addFormulario(this.form);
        this.navController.navigateForward('/');

      } catch (e) {
        console.error(e);
      }
    } else {
      console.error('El formulario tiene campos incorrectos');
    }
  }

}
