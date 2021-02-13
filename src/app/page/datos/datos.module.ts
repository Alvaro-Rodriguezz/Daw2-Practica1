import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatosPageRoutingModule } from './datos-routing.module';

import { DatosPage } from './datos.page';
import { AccountInfoComponent } from 'src/app/component/account-info/account-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatosPageRoutingModule
  ],
  declarations: [DatosPage]
})
export class DatosPageModule {}
