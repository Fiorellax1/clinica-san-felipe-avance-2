import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthResponse, LoginRequest, RegistroRequest } from '../../shared/models/usuario.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = `${environment.apiUrl}/api/auth`;

  constructor(private http: HttpClient) {}

  registrar(datos: RegistroRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/registro`, datos)
      .pipe(tap((resp) => this.guardarSesion(resp)));
  }

  login(datos: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/login`, datos)
      .pipe(tap((resp) => this.guardarSesion(resp)));
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  estaAutenticado(): boolean {
    return localStorage.getItem('token') !== null;
  }

  obtenerRol(): string | null {
    return localStorage.getItem('rol');
  }

  private guardarSesion(resp: AuthResponse): void {
    localStorage.setItem('token', resp.token);
    localStorage.setItem('rol', resp.rol);
  }
}
