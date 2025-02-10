



export enum UserRole {
  Collector = 'collector',
  Particular = 'particular'
}
export interface User {
  points: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  profilePhoto?: string;
  role: UserRole;
}
