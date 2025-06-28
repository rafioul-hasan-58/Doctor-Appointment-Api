export interface IPatient {
  name: string;
  email: string;
  phone: string;
  password: string;
  age: number;
  gender: 'male' | 'female' | 'other';
}
