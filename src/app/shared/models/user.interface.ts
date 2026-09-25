export type Roles = 'SUSCRIPTOR' | 'admin';

export interface User {
  username: string;
  password: string;
}

export interface UserResponse extends User {
  token: string;
  id: number;
  rol: Roles;
  nombre: string;
}
