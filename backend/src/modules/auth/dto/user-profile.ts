export class UserProfileDto {
  accessToken: string;

  user: {
    id: number;
    email: string;
    name: string;
    role: string;
  };

  constructor(accessToken: string, user: any) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
