import { User } from "./User";

export interface Organization {
    id: string;
    email: string;
    phoneNr: string;
    address: string;
    postalCode: string;
    country: string;
    role: string;
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
