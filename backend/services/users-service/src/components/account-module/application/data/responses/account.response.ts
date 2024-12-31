import { ProfileResponse } from './profile.response';

export class AccountResponse {
  id: string;
  email: string;
  profile?: ProfileResponse;
}
