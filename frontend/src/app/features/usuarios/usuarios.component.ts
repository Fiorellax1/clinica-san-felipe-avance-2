import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { Usuario } from '../../shared/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  imports: [RouterLink],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.usuarioService.listar().subscribe((usuarios) => (this.usuarios = usuarios));
  }
}
