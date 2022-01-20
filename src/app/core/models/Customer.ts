import { User } from './User';

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  isAdmin: string;
  user: User;
}
