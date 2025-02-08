export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  dateOfBirth: Date;
  profilePhoto?: string; // Optionnel
}
