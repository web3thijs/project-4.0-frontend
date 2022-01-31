import { User } from './User';

export interface Customer extends User {
  firstName: string;
  lastName: string;
}
