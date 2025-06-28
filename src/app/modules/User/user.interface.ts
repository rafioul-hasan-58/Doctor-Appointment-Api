export type UserRole = 'doctor' | 'patient';

export interface IUser {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}
