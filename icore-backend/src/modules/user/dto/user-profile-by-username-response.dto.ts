export class UserProfileByUsernameResponse {
  username: string;
  firstName: string;
  lastName: string;
  department?: string | null;
  batch?: string | null;
  bio?: string | null;
  title?: string | null;
  location?: string | null;
  company?: string | null;
  institution?: string | null;
  fieldOfStudy?: string | null;
  yearsOfExperience?: number | null;
  avatarUrl?: string | null;
  coverImageUrl?: string | null;
  website?: string | null;
  github?: string | null;
  linkedin?: string | null;
  youtube?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  experiences?: any;
  skills?: any;
  role: string;
  createdAt: Date;
}
