export interface User {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  dateOfBirth: Date;
  profilePhoto?: string; // Optionnel
}
