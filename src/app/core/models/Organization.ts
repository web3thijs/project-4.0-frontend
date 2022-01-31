import { User } from "./User";

export interface Organization extends User {
  organizationName: string;
  companyRegistrationNr: string;
  vatNr: string;
  who: string;
  what: string;
  help: string;
  supportPhoneNr: string;
  supportEmail: string;
  imageUrl: string;
}
