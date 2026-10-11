export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  telefono: string | null;
  rol: string;
}

export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegistroRequest {
  nombre: string;
  correo: string;
  password: string;
  telefono: string;
}

export interface AuthResponse {
  token: string;
  nombre: string;
  correo: string;
  rol: string;
}
