export interface AccountInterface {
  id?: string;
  email: string;
  profile: {
    fullName: string;
    username: string;
    dateOfBirth: Date;
    bio: string;
    picture: string;
    phoneNumber: string;
    language: string;
  };
}
