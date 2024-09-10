export interface User {
  email: string;
  password: string;
  givenName: string;
  familyName: string;
  code: string;
  role: string;
  showPassword?: boolean;
  roles: string; // Add this line if it's not already present
}
