import {User} from './user';

export interface UserResponse {
  token: string;
  id: string;
  email: string;
  message: string;
}
