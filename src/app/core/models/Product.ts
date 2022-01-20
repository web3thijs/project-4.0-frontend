import { Organization } from "./Organization";

export interface Product {
  id: string;
  categoryId: string;
  organizationId: string;
  name: string;
  price: number;
  description: string;
  isActive: boolean;
  imageUrl: string;
  organization: Organization;
}
