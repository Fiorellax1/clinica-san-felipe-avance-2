import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../shared/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private baseUrl = `${environment.apiUrl}/api/usuarios`;

  constructor(private http: HttpClient) {}

  miPerfil(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseUrl}/me`);
  }

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.baseUrl);
  }
}
