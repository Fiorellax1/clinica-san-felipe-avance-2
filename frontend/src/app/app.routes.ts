import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { rolGuard } from './core/guards/rol.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegistroComponent } from './features/auth/registro/registro.component';
import { InicioComponent } from './features/inicio/inicio.component';
import { UsuariosComponent } from './features/usuarios/usuarios.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'inicio', component: InicioComponent, canActivate: [authGuard] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [authGuard, rolGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
