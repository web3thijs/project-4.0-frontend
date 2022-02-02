import { Organization } from "./Organization";

export interface Donation {
  id: number;
  amount: number;
  orderId: number;
  organizationId: number;
  organization: Organization;
}
