import { User } from "./User";

export interface Organization extends User {
  organizationName: string;
  companyRegistrationNr: string;
  vatNr: string;
  about: string;
  supportPhoneNr: string;
  supportEmail: string;
  imageUrl: string;
}
