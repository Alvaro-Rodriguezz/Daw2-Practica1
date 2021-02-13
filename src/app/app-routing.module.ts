import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './page/guards/authentication.guard';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)},
  {path: 'register', loadChildren: () => import('./page/register/register.module').then( m => m.RegisterPageModule)},
  {path: 'home', loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule), canActivate: [AuthenticationGuard]},
  {path: 'datos',loadChildren: () => import('./page/datos/datos.module').then( m => m.DatosPageModule), canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
