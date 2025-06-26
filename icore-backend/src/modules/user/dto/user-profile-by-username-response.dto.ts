export class UserProfileByUsernameResponse {
  id: string;
  firstName: string;
  lastName: string;
  department: string | null;
  contactNumber: string | null;
  email: string;
  batch: string | null;
  createdAt: Date;
  role: string;
}