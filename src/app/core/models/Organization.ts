import { User } from "./User";

export interface Organization {
  id: string;
  organizationName: string;
  companyRegistrationNr: string;
  vatNr: string;
  about: string;
  supportPhoneNr: string;
  supportEmail: string;
  user: User;
}
