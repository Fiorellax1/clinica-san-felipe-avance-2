import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-inicio',
  imports: [RouterLink],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
})
export class InicioComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.usuarioService.miPerfil().subscribe({
      next: (usuario) => (this.usuario = usuario),
      error: () => this.salir(),
    });
  }

  esAdministrador(): boolean {
    return this.authService.obtenerRol() === 'ADMINISTRADOR';
  }

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
